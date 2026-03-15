import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { transformWithEsbuild } from 'vite';

const r = (p: string) => path.resolve(__dirname, p);
const OBJECT_UTILS_STUB = fs.readFileSync(r('web/stubs/object-utils.js'), 'utf-8');
const VIRTUAL_OBJECT_UTILS = '\0virtual:object-utils-stub';

export default defineConfig({
  root: 'web',
  envDir: path.resolve(__dirname),
  plugins: [
    // Transform .js files with JSX in react-native-vector-icons so they parse (enforce before react)
    {
      name: 'vector-icons-jsx',
      enforce: 'pre',
      async transform(code, id) {
        const pathname = id.split('?')[0];
        const isVectorIconsJs = pathname.includes('node_modules/react-native-vector-icons') && pathname.endsWith('.js');
        const isNativeStub = pathname.includes('NativeRNVectorIcons');
        if (isVectorIconsJs && !isNativeStub && code.includes('<')) {
          const result = await transformWithEsbuild(code, pathname, { loader: 'jsx', jsx: 'automatic' });
          return { code: result.code, map: result.map };
        }
      },
    },
    react(),
    // Stub Flow/native-only module and CJS helpers so they never load from node_modules
    {
      name: 'stub-react-native-vector-icons-native',
      enforce: 'pre',
      resolveId(id) {
        const pathname = id.split('?')[0];
        if (
          id === './NativeRNVectorIcons' ||
          id === 'NativeRNVectorIcons' ||
          pathname.endsWith('NativeRNVectorIcons.js') ||
          pathname.endsWith('/NativeRNVectorIcons')
        ) {
          return r('web/stubs/NativeRNVectorIcons.js');
        }
        if (pathname.includes('react-native-vector-icons') && pathname.includes('object-utils')) {
          return VIRTUAL_OBJECT_UTILS;
        }
      },
      load(id) {
        if (id === VIRTUAL_OBJECT_UTILS) return OBJECT_UTILS_STUB;
      },
      // Intercept direct /@fs/ requests from browser (bypass resolve/alias) so we always serve ESM stub
      configureServer(server) {
        const stub = (_req: any, res: any, next: () => void) => {
          const url = _req.url?.split('?')[0] ?? '';
          if (url.includes('react-native-vector-icons') && url.includes('object-utils.js')) {
            res.setHeader('Content-Type', 'application/javascript');
            res.end(OBJECT_UTILS_STUB);
            return;
          }
          next();
        };
        (server.middlewares as any).stack.unshift({ route: '', handle: stub });
      },
    },
  ],
  resolve: {
    alias: [
      // Match full path (e.g. /@fs/.../node_modules/.../object-utils.js) so we serve ESM stub
      {
        find: /.*[\/\\]react-native-vector-icons[\/\\]lib[\/\\]object-utils\.js$/,
        replacement: r('web/stubs/object-utils.js'),
      },
      // Direct path imports (used by some libs) → stubs
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: r('web/stubs/codegenNativeComponent.js'),
      },
      {
        find: 'react-native/Libraries/ReactNative/AppContainer',
        replacement: r('web/stubs/AppContainer.js'),
      },
      {
        find: 'react-native/Libraries/TurboModule/RCTExport',
        replacement: r('web/stubs/RCTExport.js'),
      },
      {
        find: 'react-native-vector-icons/lib/object-utils',
        replacement: r('web/stubs/object-utils.js'),
      },
      { find: 'react-native', replacement: r('web/stubs/react-native.js') },
      { find: '@', replacement: r('src') },
    ],
  },
  define: {
    'global': 'globalThis',
  },
  optimizeDeps: {
    include: ['prop-types', 'react-native-paper'],
    exclude: ['react-native-vector-icons'],
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  ssr: {
    noExternal: ['react-native-vector-icons'],
  },
  server: {
    port: 3000,
  },
});

// const path = require("path");
// const { getDefaultConfig } = require("expo/metro-config");

// const projectRoot = __dirname;
// const workspaceRoot = path.resolve(projectRoot, "..");
// const metroRuntimePath = require.resolve("metro-runtime/package.json", {
//   paths: [workspaceRoot]
// });
// const metroRuntimeDir = path.dirname(metroRuntimePath);

// const config = getDefaultConfig(projectRoot);
// config.watchFolders = [workspaceRoot];
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, "node_modules"),
//   path.resolve(workspaceRoot, "node_modules")
// ];
// config.resolver.extraNodeModules = new Proxy(
//   {},
//   {
//     get: (_, name) => {
//       if (name === "metro-runtime") return metroRuntimeDir;
//       return path.join(workspaceRoot, "node_modules", name.toString());
//     }
//   }
// );

const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable strict package exports resolution to fallback to classic Node resolution
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Card, Input } from "@care-connect/ui/native";
import {
  parseGroupInsert,
  parseGroupMemberInsert,
  parsePatientInsert,
  type GroupMemberRow,
  type GroupRow,
  type PatientRow
} from "@care-connect/domain";
import { supabase } from "../config/supabase";
import type { RootStackParamList } from "../App";

type GroupEntry = {
  role: GroupMemberRow["role"];
  group: GroupRow;
};

const bloodTypeOptions: NonNullable<PatientRow["blood_type"]>[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown"
];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<GroupEntry[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMemberRow[]>([]);
  const [patient, setPatient] = useState<PatientRow | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const [newGroupName, setNewGroupName] = useState("");
  const [joinGroupId, setJoinGroupId] = useState("");
  const [memberUserId, setMemberUserId] = useState("");
  const [memberRole, setMemberRole] = useState<GroupMemberRow["role"]>("member");

  const [patientDob, setPatientDob] = useState("");
  const [patientBloodType, setPatientBloodType] = useState<PatientRow["blood_type"]>(null);
  const [patientLanguage, setPatientLanguage] = useState("");
  const [patientInterpreterNeeded, setPatientInterpreterNeeded] = useState(false);

  const activeGroup = useMemo(
    () => groups.find((entry) => entry.group.id === activeGroupId)?.group ?? null,
    [groups, activeGroupId]
  );

  const loadUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    setUserId(data.user?.id ?? null);
  }, []);

  const loadGroups = useCallback(async () => {
    if (!userId) return;
    setStatus("loading");
    setError(null);

    const { data, error: groupError } = await supabase
      .from("group_members")
      .select("role, groups ( id, name, owner_id, created_at )")
      .eq("user_id", userId);

    if (groupError) {
      setStatus("error");
      setError(groupError.message);
      return;
    }

    const entries: GroupEntry[] =
      data
        ?.map((row) => {
          const group = (row as { groups: GroupRow | null }).groups;
          if (!group) return null;
          return { role: row.role as GroupMemberRow["role"], group };
        })
        .filter((entry): entry is GroupEntry => Boolean(entry)) ?? [];

    setGroups(entries);
    setActiveGroupId((prev) => prev ?? entries[0]?.group.id ?? null);
    setStatus("idle");
  }, [userId]);

  const loadGroupMembers = useCallback(async () => {
    if (!activeGroupId) {
      setGroupMembers([]);
      return;
    }

    const { data, error: membersError } = await supabase
      .from("group_members")
      .select("*")
      .eq("group_id", activeGroupId);

    if (membersError) {
      setError(membersError.message);
      return;
    }

    setGroupMembers(data ?? []);
  }, [activeGroupId]);

  const loadPatient = useCallback(async () => {
    if (!activeGroupId) {
      setPatient(null);
      return;
    }

    const { data, error: patientError } = await supabase
      .from("patients")
      .select("*")
      .eq("group_id", activeGroupId)
      .maybeSingle();

    if (patientError) {
      setError(patientError.message);
      return;
    }

    setPatient(data ?? null);
  }, [activeGroupId]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  useEffect(() => {
    loadGroupMembers();
    loadPatient();
  }, [loadGroupMembers, loadPatient]);

  const handleCreateGroup = async () => {
    if (!userId) return;
    setStatus("loading");
    setError(null);

    try {
      const payload = parseGroupInsert({
        name: newGroupName.trim() ? newGroupName.trim() : null,
        owner_id: userId
      });

      const { data: group, error: groupError } = await supabase
        .from("groups")
        .insert(payload)
        .select()
        .single();

      if (groupError) {
        setStatus("error");
        setError(groupError.message);
        return;
      }

      const memberPayload = parseGroupMemberInsert({
        group_id: group.id,
        user_id: userId,
        role: "owner"
      });

      const { error: memberError } = await supabase.from("group_members").insert(memberPayload);
      if (memberError) {
        setStatus("error");
        setError(memberError.message);
        return;
      }

      setNewGroupName("");
      await loadGroups();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to create group.");
    }
  };

  const handleJoinGroup = async () => {
    if (!userId || !joinGroupId.trim()) return;
    setStatus("loading");
    setError(null);

    try {
      const payload = parseGroupMemberInsert({
        group_id: joinGroupId.trim(),
        user_id: userId,
        role: "member"
      });

      const { error: joinError } = await supabase.from("group_members").insert(payload);
      if (joinError) {
        setStatus("error");
        setError(joinError.message);
        return;
      }

      setJoinGroupId("");
      await loadGroups();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to join group.");
    }
  };

  const handleAddMember = async () => {
    if (!activeGroupId || !memberUserId.trim()) return;
    setStatus("loading");
    setError(null);

    try {
      const payload = parseGroupMemberInsert({
        group_id: activeGroupId,
        user_id: memberUserId.trim(),
        role: memberRole
      });

      const { error: memberError } = await supabase.from("group_members").insert(payload);
      if (memberError) {
        setStatus("error");
        setError(memberError.message);
        return;
      }

      setMemberUserId("");
      await loadGroupMembers();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to add member.");
    }
  };

  const handleCreatePatient = async () => {
    if (!activeGroupId) return;
    setStatus("loading");
    setError(null);

    try {
      const payload = parsePatientInsert({
        group_id: activeGroupId,
        date_of_birth: patientDob.trim() ? patientDob.trim() : null,
        blood_type: patientBloodType ?? null,
        language: patientLanguage.trim() ? patientLanguage.trim() : null,
        interpreter_needed: patientInterpreterNeeded
      });

      const { data, error: patientError } = await supabase
        .from("patients")
        .insert(payload)
        .select()
        .single();

      if (patientError) {
        setStatus("error");
        setError(patientError.message);
        return;
      }

      setPatient(data);
      setPatientDob("");
      setPatientBloodType(null);
      setPatientLanguage("");
      setPatientInterpreterNeeded(false);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to create patient.");
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  };

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerClassName="px-6 pb-12 pt-10">
      <Text className="text-2xl font-semibold text-slate-900">Care Connect</Text>
      <Text className="mt-2 text-sm text-slate-600">Phase 1 dashboard</Text>
      {error ? <Text className="mt-3 text-sm text-rose-600">{error}</Text> : null}

      <Card className="mt-6">
        <Text className="text-lg font-semibold text-slate-900">Your groups</Text>
        <Text className="mt-2 text-sm text-slate-600">
          Create a new group or join an existing one with a group ID.
        </Text>
        <View className="mt-4 gap-3">
          <Input placeholder="New group name" value={newGroupName} onChangeText={setNewGroupName} />
          <Button
            title={status === "loading" ? "Creating..." : "Create group"}
            onPress={handleCreateGroup}
            disabled={status === "loading"}
          />
          <Input placeholder="Join group by ID" value={joinGroupId} onChangeText={setJoinGroupId} />
          <Button
            title={status === "loading" ? "Joining..." : "Join group"}
            variant="outline"
            onPress={handleJoinGroup}
            disabled={status === "loading"}
          />
        </View>
        {groups.length > 0 ? (
          <View className="mt-4 gap-2">
            {groups.map((entry) => {
              const isActive = entry.group.id === activeGroupId;
              return (
                <Pressable
                  key={entry.group.id}
                  onPress={() => setActiveGroupId(entry.group.id)}
                  className={[
                    "rounded-xl border px-4 py-3",
                    isActive ? "border-brand bg-brand/10" : "border-slate-200 bg-white"
                  ].join(" ")}
                >
                  <Text className="text-sm font-semibold text-slate-900">
                    {entry.group.name ?? "Unnamed group"}
                  </Text>
                  <Text className="text-xs text-slate-600">
                    Role: {entry.role} • ID: {entry.group.id}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <Text className="mt-4 text-sm text-slate-500">No groups yet.</Text>
        )}
      </Card>

      {activeGroup ? (
        <Card className="mt-6">
          <Text className="text-lg font-semibold text-slate-900">Group members</Text>
          <Text className="mt-2 text-sm text-slate-600">
            Add teammates by user ID (Supabase auth user UUID).
          </Text>
          <View className="mt-4 gap-3">
            <Input placeholder="User ID" value={memberUserId} onChangeText={setMemberUserId} />
            <View className="flex-row flex-wrap gap-2">
              {(["owner", "admin", "member", "patient"] as GroupMemberRow["role"][]).map((role) => (
                <Pressable
                  key={role}
                  onPress={() => setMemberRole(role)}
                  className={[
                    "rounded-full border px-3 py-1",
                    memberRole === role ? "border-brand bg-brand/10" : "border-slate-200 bg-white"
                  ].join(" ")}
                >
                  <Text className="text-xs text-slate-700">{role}</Text>
                </Pressable>
              ))}
            </View>
            <Button
              title={status === "loading" ? "Adding..." : "Add member"}
              onPress={handleAddMember}
              disabled={status === "loading"}
            />
          </View>
          <View className="mt-4 gap-2">
            {groupMembers.map((member) => (
              <View key={`${member.group_id}-${member.user_id}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                <Text className="text-xs text-slate-700">
                  {member.user_id} • {member.role}
                </Text>
              </View>
            ))}
            {groupMembers.length === 0 ? (
              <Text className="text-sm text-slate-500">No members yet.</Text>
            ) : null}
          </View>
        </Card>
      ) : null}

      {activeGroup ? (
        <Card className="mt-6">
          <Text className="text-lg font-semibold text-slate-900">Patient</Text>
          {patient ? (
            <View className="mt-4 gap-3">
              <Text className="text-sm text-slate-700">DOB: {patient.date_of_birth ?? "Not set"}</Text>
              <Text className="text-sm text-slate-700">Blood type: {patient.blood_type ?? "Not set"}</Text>
              <Text className="text-sm text-slate-700">Language: {patient.language ?? "Not set"}</Text>
              <Text className="text-sm text-slate-700">
                Interpreter needed: {patient.interpreter_needed ? "Yes" : "No"}
              </Text>
              <Button
                title="Open patient details"
                onPress={() =>
                  navigation.navigate("PatientDetail", { patientId: patient.id, groupId: activeGroup.id })
                }
              />
            </View>
          ) : (
            <View className="mt-4 gap-3">
              <Text className="text-sm text-slate-600">
                This group does not have a patient yet. Add the minimal profile below.
              </Text>
              <Input placeholder="Date of birth (YYYY-MM-DD)" value={patientDob} onChangeText={setPatientDob} />
              <View className="flex-row flex-wrap gap-2">
                {bloodTypeOptions.map((type) => (
                  <Pressable
                    key={type}
                    onPress={() => setPatientBloodType(type)}
                    className={[
                      "rounded-full border px-3 py-1",
                      patientBloodType === type ? "border-brand bg-brand/10" : "border-slate-200 bg-white"
                    ].join(" ")}
                  >
                    <Text className="text-xs text-slate-700">{type}</Text>
                  </Pressable>
                ))}
              </View>
              <Input placeholder="Preferred language" value={patientLanguage} onChangeText={setPatientLanguage} />
              <View className="flex-row gap-2">
                <Pressable
                  onPress={() => setPatientInterpreterNeeded(false)}
                  className={[
                    "rounded-full border px-3 py-1",
                    !patientInterpreterNeeded ? "border-brand bg-brand/10" : "border-slate-200 bg-white"
                  ].join(" ")}
                >
                  <Text className="text-xs text-slate-700">Interpreter: No</Text>
                </Pressable>
                <Pressable
                  onPress={() => setPatientInterpreterNeeded(true)}
                  className={[
                    "rounded-full border px-3 py-1",
                    patientInterpreterNeeded ? "border-brand bg-brand/10" : "border-slate-200 bg-white"
                  ].join(" ")}
                >
                  <Text className="text-xs text-slate-700">Interpreter: Yes</Text>
                </Pressable>
              </View>
              <Button
                title={status === "loading" ? "Creating..." : "Create patient"}
                onPress={handleCreatePatient}
                disabled={status === "loading"}
              />
            </View>
          )}
        </Card>
      ) : null}

      <View className="mt-8">
        <Button
          title={isSigningOut ? "Signing out..." : "Sign out"}
          variant="outline"
          onPress={handleSignOut}
          disabled={isSigningOut}
        />
      </View>
    </ScrollView>
  );
}

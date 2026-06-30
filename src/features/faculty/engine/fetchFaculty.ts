import type { FacultyBranchData } from "@/types/faculty";
import type { Student } from "@/types/student";

const cache = new Map<string, FacultyBranchData>();

export async function fetchFaculty(
  student: Student,
): Promise<FacultyBranchData> {
  const key = `${student.yearLabel}/${student.branch}`;

  if (cache.has(key)) {
    return cache.get(key)!;
  }

  const response = await fetch(
    `/data/faculty/${student.yearLabel}/${student.branch}.json`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch faculty data for ${key}: ${response.statusText}`,
    );
  }

  const data = (await response.json()) as FacultyBranchData;
  if (!data || typeof data !== "object") {
    throw new Error(`Invalid faculty data received for ${key}`);
  }

  cache.set(key, data);
  return data;
}

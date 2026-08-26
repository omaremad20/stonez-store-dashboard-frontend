import type { UserProfile } from "@/app/dashboard/users/_types/user";

const mockUsersById: Record<string, UserProfile> = {
  "550e8400-e29b-41d4-a716-446655440001": {
    id: "550e8400-e29b-41d4-a716-446655440001",
    full_name: "John Doe",
    email: "admin@example.com",
    phone: "+201234567890",
    role: "Admin",
  },
  "550e8400-e29b-41d4-a716-446655440002": {
    id: "550e8400-e29b-41d4-a716-446655440002",
    full_name: "Sarah Ahmed",
    email: "editor@example.com",
    phone: "+201098765432",
    role: "Editor",
  },
};

/**
 * Stand-in for a future `profiles` lookup. Simulates a short network
 * delay so the dialog's loading state has something real to show.
 */
export async function fetchMockUserById(
  userId: string,
): Promise<UserProfile | null> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return mockUsersById[userId] ?? null;
}

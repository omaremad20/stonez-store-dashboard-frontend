/**
 * Shape returned by the future `profiles` lookup. Kept intentionally
 * small — only what the "Show" dialog needs to display.
 */
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
}

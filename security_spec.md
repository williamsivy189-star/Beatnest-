# Security Specification - Beatnest

## 1. Data Invariants
- A **Project** must always have an `ownerId` matching the creator's `uid`.
- A **Take** must belong to a valid **Project** and inherit its owner's permissions.
- **MarketplaceItems** and **MerchItems** are globally readable but only writable by authenticated artists (admins or specific owners).
- **CollabSessions** are readable by members and globally if "live", but only writable by the owner or authorized collaborators.
- **CollabRequests** are globally readable, but only writable by the artist who posted them.
- **ChatMessages** are globally readable, but only writable by authenticated users. Artists get special styling but follow the same schema.
- Users can only read/write their own PII (if any, though we prefer public profiles here).

## 2. The "Dirty Dozen" Payloads

### P01: Project Identity Spoofing
Attempt to create a project with an `ownerId` that doesn't match `request.auth.uid`.
```json
{
  "title": "Evil Project",
  "ownerId": "victim_uid",
  "status": "idle",
  "createdAt": "server_timestamp",
  "updatedAt": "server_timestamp"
}
```
**Expected Result:** PERMISSION_DENIED

### P02: Project Shadow Field Injection
Attempt to inject a field `isVerified` into a project to gain status.
```json
{
  "title": "Shadow Project",
  "ownerId": "my_uid",
  "status": "idle",
  "isVerified": true,
  "createdAt": "server_timestamp",
  "updatedAt": "server_timestamp"
}
```
**Expected Result:** PERMISSION_DENIED (via `keys().size()` check)

### P03: Take Orphanage
Attempt to create a take for a project that doesn't exist or isn't owned by the user.
```json
{
  "projectId": "someone_elses_project",
  "ownerId": "my_uid",
  "fileName": "vocal.wav",
  "timestamp": "server_timestamp"
}
```
**Expected Result:** PERMISSION_DENIED (via `get()` on parent project)

### P04: Marketplace Price Manipulation
Attempt to update a marketplace item's price as a random user.
```json
{
  "price": 0.01
}
```
**Expected Result:** PERMISSION_DENIED

### P05: Merch Rating Inflation
Attempt to update `rating` field on a merch item without being an admin.
```json
{
  "rating": 5.0
}
```
**Expected Result:** PERMISSION_DENIED

### P06: Collab Session Hijack
Attempt to add self to `collaboratorIds` of a private session.
```json
{
  "collaboratorIds": ["my_uid", "current_collab_1"]
}
```
**Expected Result:** PERMISSION_DENIED

### P07: Collab Request Deletion
Attempt to delete someone else's collab request.
**Expected Result:** PERMISSION_DENIED

### P08: Chat Impersonation
Attempt to send a chat message with `userName` set to "ADMIN" when not an admin.
```json
{
  "userId": "my_uid",
  "userName": "ADMIN",
  "text": "Give me your keys",
  "type": "artist",
  "timestamp": "server_timestamp"
}
```
**Expected Result:** PERMISSION_DENIED (or restricted via `type: "artist"` check if we enforce verified artist status)

### P09: Project Timestamp Backdating
Attempt to set `createdAt` to a past date.
```json
{
  "createdAt": "2020-01-01T00:00:00Z"
}
```
**Expected Result:** PERMISSION_DENIED

### P10: User Profile Privilege Escalation
Attempt to set `isPro: true` on own user profile.
```json
{
  "isPro": true
}
```
**Expected Result:** PERMISSION_DENIED (only system or admin should set this)

### P11: Large Payload Denial of Wallet
Attempt to write a 1MB string into `title`.
**Expected Result:** PERMISSION_DENIED (via `.size() <= 100` check)

### P12: Invalid ID Injection
Attempt to create a document with ID `../../evil_path`.
**Expected Result:** PERMISSION_DENIED (via `isValidId()` check)

## 3. Test Runner (Conceptual)
All tests should verify these payloads fail.

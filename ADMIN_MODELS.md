# Admin Dashboard Models & API Integration

## New Database Models

### 1. AdminActivity
Tracks all admin actions and user activities in the system.

**Fields:**
- `user` - ForeignKey to User (who performed the action)
- `activity_type` - CharField with choices: upload, download, review, register, book_approved, book_rejected, user_deleted, book_deleted
- `book` - ForeignKey to Book (optional, for book-related activities)
- `target_user` - ForeignKey to User (optional, for user-related activities)
- `description` - TextField for activity details
- `timestamp` - DateTimeField (auto-created)

**Usage:** Automatically created when books are uploaded or admin actions are performed.

---

### 2. BookApprovalStatus
Manages the approval workflow for uploaded books.

**Fields:**
- `book` - OneToOneField to Book
- `status` - CharField with choices: pending, approved, rejected
- `reviewed_by` - ForeignKey to User (admin who reviewed)
- `review_date` - DateTimeField (when reviewed)
- `rejection_reason` - TextField (if rejected)
- `created_at` - DateTimeField (auto-created)
- `updated_at` - DateTimeField (auto-updated)

**Usage:** Automatically created when a book is uploaded. Updated when admin approves/rejects.

---

## New API Endpoints

### Admin Dashboard Stats
**GET** `/api/admin/stats/`
- Returns: total_users, total_books, total_downloads, active_users, pending_books
- Requires: Staff/Admin permission

### Admin Recent Activities
**GET** `/api/admin/activities/`
- Returns: List of recent admin activities (last 20)
- Requires: Staff/Admin permission

### Admin Pending Books
**GET** `/api/admin/pending-books/`
- Returns: List of books awaiting approval
- Requires: Staff/Admin permission

### Admin All Books
**GET** `/api/admin/books/`
- Returns: All books with full details
- Requires: Staff/Admin permission

### Admin All Users
**GET** `/api/admin/users/`
- Returns: List of all users with stats (uploads, downloads, role)
- Requires: Staff/Admin permission

### Approve Book
**POST** `/api/admin/books/<book_id>/approve/`
- Updates book status to approved
- Creates AdminActivity record
- Requires: Staff/Admin permission

### Reject Book
**POST** `/api/admin/books/<book_id>/reject/`
- Updates book status to rejected
- Accepts: `reason` in request body
- Creates AdminActivity record
- Requires: Staff/Admin permission

---

## Signals

### Book Upload Signal
When a book is created:
1. Automatically creates a BookApprovalStatus record (status: pending)
2. Creates an AdminActivity record (type: upload)

---

## Admin Interface

All new models are registered in Django admin:
- AdminActivity - View all activities with filtering by type and date
- BookApprovalStatus - Manage book approvals with status filtering

---

## Frontend Integration

The admin dashboard frontend can now call these endpoints to:
1. Display dashboard statistics
2. Show recent activities
3. List all books with approval status
4. List all users with activity metrics
5. Approve/reject pending books

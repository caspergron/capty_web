# Firestore Document Setup Guide

## Setting Up Your First Document

1. **Document ID**: You can use the auto-generated ID that Firebase has provided.

2. **Fields to add**: Based on our application structure, add the following fields one by one:

   | Field Name | Type   | Sample Value               |
   |------------|--------|----------------------------|
   | name       | string | John Doe                   |
   | email      | string | john.doe@example.com       |
   | country    | string | United States              |
   | timestamp  | timestamp | (Use the server timestamp) |

3. **Adding Each Field**:
   - Click "Add field"
   - Enter the field name (e.g., "name")
   - Select the appropriate type from the dropdown
   - Enter a sample value
   - Repeat for each field

4. For the timestamp field, select "timestamp" as the type and use the server timestamp option if available.

5. Click "Save" when you've added all fields.

## Testing the Collection

After setting up your first document, you can test that your Firestore integration works by:

1. Running your application locally
2. Filling out the notification form
3. Checking that a new document appears in the collection with the data you entered

## Security Rules

Don't forget to set up appropriate security rules for your Firestore database. Since this is a public-facing form, you'll need rules that allow write access to this collection.

Example security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notificationRequests/{document=**} {
      // Allow anyone to write to notification requests
      // but only allow authenticated admins to read
      allow write: if true;
      allow read: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```
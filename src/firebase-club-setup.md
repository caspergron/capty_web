# Setting Up Clubs in Firebase Firestore

This guide will help you add club data to your Firestore database.

## Step 1: Access Firestore

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (capty-webpage)
3. In the left sidebar, click "Firestore Database"

## Step 2: Create the Clubs Collection

1. Click "Start collection" or "Create collection"
2. Enter `clubs` as the Collection ID
3. Click "Next"

## Step 3: Add Your First Club Document

1. You can use an auto-generated Document ID or create your own
2. Add the following fields:

   | Field Name | Type   | Example Value           |
   |------------|--------|-------------------------|
   | name       | string | Disc Golf Austin        |
   | location   | string | USA                     |
   | members    | number | 250                     |
   | createdAt  | timestamp | (use server timestamp) |

3. Click "Save"

## Step 4: Add More Club Documents

Repeat the process to add more clubs. Here are some example clubs you can add:

| Club Name             | Location | Members |
|-----------------------|----------|---------|
| Stockholm Disc Golfers| Sweden   | 185     |
| Helsinki Disc Club    | Finland  | 320     |
| Berlin Disc Masters   | Germany  | 275     |
| Oslo Frisbee Team     | Norway   | 140     |
| Portland Disc League  | USA      | 230     |
| Gothenburg Throwers   | Sweden   | 155     |
| Munich Disc Society   | Germany  | 200     |
| Atlanta Disc Club     | USA      | 310     |
| Tampere Disc Golf     | Finland  | 185     |
| Bergen Disc Throwers  | Norway   | 120     |

## Step 5: Test Your Implementation

1. Go to your website
2. Navigate to the "Featured Clubs" section
3. Verify that the clubs from Firestore appear in the table
4. Try going to the Admin page (/admin) to add, edit, or delete clubs

## Notes on Security

For simplicity, the current security rules allow anyone to read and write to the clubs collection. In a production environment, you should:

1. Set up proper authentication
2. Modify security rules to only allow authenticated admins to modify club data
3. Add validation rules to ensure data integrity

Example of more secure rules:

```
match /clubs/{clubId} {
  // Anyone can read
  allow read: if true;
  
  // Only authenticated admins can write
  allow write: if request.auth != null && request.auth.token.admin == true;
}
```
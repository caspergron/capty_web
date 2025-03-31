# Setting Up Disc Sales Ads in Firebase Firestore

This guide will help you add disc sales ad data to your Firestore database.

## Step 1: Access Firestore

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (capty-webpage)
3. In the left sidebar, click "Firestore Database"

## Step 2: Create the Disc Sales Ads Collection

1. Click "Start collection" or "Create collection"
2. Enter `discSalesAds` as the Collection ID
3. Click "Next"

## Step 3: Add Your First Disc Sales Ad Document

1. You can use an auto-generated Document ID or create your own
2. Add the following fields:

   | Field Name      | Type     | Example Value                                                              |
   |-----------------|----------|---------------------------------------------------------------------------|
   | discName        | string   | Destroyer                                                                  |
   | brand           | string   | Innova                                                                     |
   | sellerCountry   | string   | USA                                                                        |
   | flightNumbers   | map      | {speed: 12, glide: 5, turn: -1, fade: 3}                                  |
   | price           | number   | 18                                                                         |
   | currency        | string   | USD                                                                        |
   | imageUrl        | string   | https://images.unsplash.com/photo-1647548666447-237f96ced5be              |
   | createdAt       | timestamp| (use server timestamp)                                                     |

3. For the `flightNumbers` map field, add the following nested fields:
   - speed (number): 12
   - glide (number): 5
   - turn (number): -1
   - fade (number): 3

4. Click "Save"

## Step 4: Add More Disc Sales Ad Documents

Repeat the process to add more disc sales ads. Here are some example discs you can add:

| Disc Name    | Brand      | Country | Flight Numbers (speed, glide, turn, fade) | Price | Currency |
|--------------|------------|---------|------------------------------------------|-------|----------|
| Buzzz        | Discraft   | USA     | 5, 4, -1, 1                              | 15    | USD      |
| Pure         | Latitude 64| Finland | 3, 3, 0, 1                               | 140   | SEK      |
| Wraith       | Innova     | Germany | 11, 5, -1, 3                             | 17    | EUR      |
| Ballista Pro | Latitude 64| Norway  | 14, 5, -0.5, 3.5                         | 220   | NOK      |
| Zone         | Discraft   | USA     | 4, 3, 0, 3                               | 16    | USD      |

## Step 5: Using Firebase Storage URLs

If you're storing disc images in Firebase Storage:

1. The Firebase Storage URLs will be in the format `gs://your-bucket-name/path/to/image.jpg`
2. Our application automatically converts these URLs to HTTP format for displaying in the browser
3. For images that need an access token, our code will append the token to the URL automatically

To get the proper image URL for a Firebase Storage image:

1. Option 1: Use the gs:// URL directly
   - Example: `gs://capty-webpage.firebasestorage.app/disc25.png`
   - The app will convert this to an HTTP URL with the access token

2. Option 2: Generate a download URL from Firebase Console
   - Go to Firebase Console > Storage
   - Find your image file
   - Click on it to view details
   - Copy the "Download URL" (should start with https://)
   - Use this URL in the `imageUrl` field

## Step 6: Test Your Implementation

1. Go to your website
2. Navigate to the "Latest Disc Sales" section
3. Verify that the disc sales ads from Firestore appear in the grid
4. Try going to the Disc Sales Admin page (/disc-sales-admin) to add, edit, or delete disc sales ads

## Notes on Storage Access Tokens

For Firebase Storage images that require authentication:

1. The access token is usually attached to the URL as `?alt=media&token=your-token-here`
2. Our application automatically adds the token for `gs://` URLs
3. If your token changes, you'll need to update the token in the `discSalesAdService.ts` file
4. In a production app, you should use Firebase's `getDownloadURL()` method instead of hardcoding tokens
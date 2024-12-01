# GreatRace.gg - iRacing Achievement Certificates

## Setup Instructions

1. Create a `.env` file in the root directory with your iRacing credentials:
   ```
   IRACING_EMAIL=your_iracing_email@example.com
   IRACING_PASSWORD=your_iracing_password
   PORT=3001
   NODE_ENV=development
   ```

2. Enable Legacy Authentication in your iRacing account:
   - Log in to iRacing website
   - Go to Account Settings
   - Enable "Legacy Read Only Authentication"

3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```

## Usage

1. Enter your iRacing Customer ID in the form
2. Your race results will be fetched automatically
3. Select a race to generate a certificate
4. Share your achievements!
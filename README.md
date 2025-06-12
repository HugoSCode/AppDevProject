# AppDevProject
https://heapsfootballapi.onrender.com
# Setup development environment
Create a .env file and copy the details below 

APP_ENV=development          //set to production to use live site
DATABASE_URL="postgresql://postgres:HelloWorld123@localhost:5432/postgres" 
JWT_SECRET=HelloWorld123

JWT_LIFETIME=1hr

in app.js file ensure url for server is set like this 

    servers: [
      {
        url: "http://localhost:3000",         //set to  url: "https://heapsfootballapi.onrender.com", to use the live site
      },
    ],

Then run this in the terminal whle having docker desktop app open:

docker run --name AppDevProject -e POSTGRES_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
# Seeding the database
* **Admin users:** npm run seed-admin
* **Normal users:** npm run seed-normal
* **Super admin users:** npm run seed-super-admin
* **Leagues:** npm run seed-leagues
* **Players, Teams, Matches, MatchEvents:** npm run seed-prem-league
# Open prisma studio
npx prisma studio
# Run API tests
Ensure tables have been seeded
* **User tests:** npm run user-test
* **All basic crud tests:** npm run base-test
* **Crud limit tests:** npm run limit-test

# ERD
![Database ER diagram (crow's foot) (1)](https://github.com/user-attachments/assets/c2012c78-9382-4132-9cad-b511fc81d6f6)

# Demo video
https://streamable.com/zmpv4x

* There was an issue at the end with deleting a user which I fixed while still filming. Apologies for this. I also recognise I likely didnt capture enough of the filtering / sorting for the fields in the video



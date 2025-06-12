# AppDevProject
https://heapsfootballapi.onrender.com
# Setup development environment
Create a .env file and copy the details below 

APP_ENV=development
DATABASE_URL="postgresql://postgres:HelloWorld123@localhost:5432/postgres"
JWT_SECRET=HelloWorld123
JWT_LIFETIME=1hr

Then run this in the terminal whle having docker desktop app open:

docker run --name AppDevProject -e POSTGRES_PASSWORD=HelloWorld123 -p 5432:5432 -d postgres
# Seeding the database
Admin users: npm run seed-admin
Normal users: npm run seed-normal
Super admin users: npm run seed-super-admin
Leagues: npm run seed-leagues
Players, Teams, Matches, MatchEvents: npm run seed-prem-league
# Open prisma studio
npx prisma studio
# Run API tests
Ensure tables have been seeded
User tests: npm run user-test
All other crud tests: npm run base-test
Crud limit tests: npm run limit-test

# ERD
![Database ER diagram (crow's foot) (1)](https://github.com/user-attachments/assets/c2012c78-9382-4132-9cad-b511fc81d6f6)




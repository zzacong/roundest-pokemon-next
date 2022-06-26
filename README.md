# Roundest - Which Pokémon is most round?

(taken and modified from [Theos's roundest-mon repo](https://github.com/TheoBr/roundest-mon))

## Getting Started

Prerequisite:

- MySQL local database (or Planetscale connection using PScale CLI)
- `yarn`

Setup

1. Clone repo
2. `yarn install`
3. Create `.env` file if one does not already exist
4. Add connection URLs for both database and shadow db to .env ([example .env file here](./.env.example))
5. Initialize database - `yarn prisma migrate dev`
   - This will run `prisma db seed` underneath
6. Run dev server `yarn dev`

## Getting Started

To get started follow the instructions bellow to setup this project

1) Install the dependencies:

```bash
npm install
```

2) Signup and/or login in Prisma

[https://www.prisma.io/studio](https://www.prisma.io/studio)

3) Create a Postgres db in Prisma studio

4) Get the environment key from the db and paste it in a .env file at the root folder.

5) Sync schema and db

```bash
npx prisma migrate dev
```

6) Generate Prisma Client

```bash
npx prisma generate
```

7) Download Ollama

[https://ollama.com/download](https://ollama.com/download)

8) Download deepseek-r1:1.5b LLM

```bash
ollama run deepseek-r1:1.5b
```

9) Start Ollama server

Open a separate terminal and run

```bash
ollama serve
```

10) Start application

On a different terminal from Ollama run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to open the application.
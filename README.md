# Archi-Logicielle

This repository contains:

* `apps/backend`: AdonisJS backend
* `packages/email-templates`: React Email templates
* `apps/frontend`: React frontend
* `docker-compose.yml`: MailDev
* Turbo + pnpm workspace for monorepo management

---

## Requirements

* Node.js >= 18
* pnpm >= 8
* Docker & Docker Compose (for MailDev)

---

## 1. Install dependencies

```bash
# From the root of the repo
pnpm install
```

This will install dependencies for all packages/apps in the workspace.

---

## 2. Configure environment variables

Create `.env` in `apps/backend`:

```env
SMTP_HOST=0.0.0.0
SMTP_PORT=1025
```

* `maildev` refers to the docker service in `docker-compose.yml`.
* Ports 1080 (web UI) and 1025 (SMTP) are exposed.

---

## 3. Start Docker services (MailDev + Backend in container)

```bash
docker-compose up --build
```

* MailDev UI: [http://localhost:1080](http://localhost:1080)

---

## 4. Run project

```bash
npx turbo run dev
```

* MailDev : [http://localhost:1080](http://localhost:1080)
* Frontend: [http://localhost:3001](http://localhost:3001)
* Backend: [http://127.0.0.1:3333](http://127.0.0.1:3333)

---

## 5. Test email sending

1. Start backend + MailDev
2. Trigger a route in backend that sends an email:

```ts
await new EmailService().sendWelcomeEmail('alice@example.com', 'Alice', 'https://example.com/verify')
```

3. Open MailDev: `http://localhost:1080` → email should appear instantly.

---

## Notes / Tips

* **Do not import `.tsx` directly in production** — compile with `tsc` or use `ts-node` with `"jsx": "react"` in tsconfig.
* Make sure MailDev is running when sending emails in dev.
* Avoid using workspace root for dependencies — install inside the app (`apps/backend`) when possible.
* On Windows, close all editors/terminals that might lock node\_modules before installing dependencies to avoid `EPERM`.

---

## Troubleshooting

* **TSX import errors / --jsx not set** → Ensure `tsconfig.json` in the backend includes:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```

* **pnpm warnings / EPERM on Windows** → Delete `node_modules` and `pnpm-lock.yaml`, then reinstall. Make sure no processes (Vite, backend, VSCode) lock files.

* **Frontend cannot reach backend (ECONNREFUSED)** →

    * If backend in Docker, use `http://backend:3333` inside Docker network.
    * If backend local, use `http://localhost:3333`.

---

## Authors

- Céline EAP
- Héloïse Le Lez
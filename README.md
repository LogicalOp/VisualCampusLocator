
## Run Locally

Clone the project

```bash
  git clone https://github.com/LogicalOp/VisualCampusLocator.git
```

Install backend dependancies and run backend
```bash
cd backend/
npm i
npm start
```
Install frontend dependancies and run frontend
```bash
cd frontend/
npm i
npm run dev
```

Also follow the steps to ensure you have AnyLoc setup, the code for the demo was changed and the vpr script needs to be altered to run on images.
```bash
python ./anyloc_vlad_generate.py --in-dir ./data/images --imgs-ext png --out-dir ./data/descriptors
```

### Requirements:
PostgreSQL database.

Redis.

Cloudinary Account.

Configure /config folder in backend folders with required info for these components.

To setup AnyLoc use the modified_setup.sh from this repo there following the same setup instructions, some dependancies are still missed but the original setup caused errors.

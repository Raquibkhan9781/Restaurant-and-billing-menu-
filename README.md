# Apna Restaurant & Billing Menu

A simple restaurant menu and billing system built with Python Flask, HTML, CSS and JavaScript.

## Features

- Restaurant menu
- Add items
- Quantity +/-
- Delete items
- Item-wise amount
- Total amount
- Generate bill
- Responsive design
- Flask backend

## Run locally

Install dependencies:

```bash
pip install -r requirements.txt
```

Run:

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## Deploy on Render

1. Push this project to GitHub.
2. Create a Web Service on Render.
3. Connect your GitHub repository.
4. Build Command:

```bash
pip install -r requirements.txt
```

5. Start Command:

```bash
gunicorn app:app
```

6. Deploy.

### Important

Do NOT use GitHub Pages for this Flask project. GitHub Pages cannot run Python/Flask backend code.

Use GitHub for the source code and Render (or another Python hosting service) to run the Flask application.

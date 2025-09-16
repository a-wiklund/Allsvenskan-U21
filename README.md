# Allsvenskan U21 Spelare – Prototyp

## Kom igång

1. Skaffa en gratis API-nyckel hos [API-Football](https://www.api-football.com/).
2. Lägg in din API-nyckel i filen `script.js` i variabeln `API_KEY`.
3. Öppna filen `index.html` i en webbläsare (du kan dubbelklicka på filen).
4. Sidan laddar senaste omgången i Allsvenskan och visar alla spelare under 21 år som fått speltid.

## Publicera på GitHub Pages

1. Skapa ett nytt GitHub-repo.
2. Lägg in alla filer (`index.html`, `styles.css`, `script.js`, `README.md`).
3. Push:a till GitHub.
4. Aktivera GitHub Pages i inställningarna, välj branch `main` och root folder `/`.
5. Besök din länk (https://ditt-användarnamn.github.io/repo-namn/).

## Obs

- API-Football tillåter inte alltid direkt anrop från webbläsare (CORS), så om inget visas kan det bero på det.
- Då kan du testa att använda en liten proxy eller köra sidan lokalt med en enkel server (t.ex. `live-server` i VSCode).

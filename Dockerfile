# Sitio estático servido con Caddy. Railway detecta este Dockerfile y lo usa
# en lugar de su detección automática.
FROM caddy:2.10-alpine

COPY Caddyfile /etc/caddy/Caddyfile

# Lista explícita de lo que se publica: solo el sitio. Así no se suben
# CLAUDE.md, README, .claude/ ni nada del repo que no sea para visitantes.
COPY index.html favicon.svg favicon.ico apple-touch-icon.png robots.txt sitemap.xml /srv/
COPY assets /srv/assets

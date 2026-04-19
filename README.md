# Maison Noir — Portfolio Photographe Haut de Gamme

Site portfolio luxe pour photographe d'art. Design éditorial sombre, galerie plein écran, animations subtiles, stack vanilla pensée pour la performance.

## Aperçu

- **Identité** : palette noir profond / crème / or patiné, typographie Cormorant × Inter
- **Sections** : Hero ciné, manifeste, portfolio filtrable (bento asymétrique), quote parallax, studio, services, journal, contact
- **Galerie** : lightbox clavier + swipe, préchargement next/prev, filtres par catégorie
- **Animations** : loader, split-text hero, reveal on scroll (IntersectionObserver), parallax rAF, magnetic buttons, custom cursor desktop

## Stack

HTML sémantique · CSS moderne (custom properties, `clamp()`, grid) · JavaScript vanilla ES2020. Zéro dépendance, zéro build, zéro framework.

```
.
├── index.html       # Structure + SEO + JSON-LD
├── css/style.css    # Design system complet
├── js/main.js       # Galerie, lightbox, reveal, cursor, parallax
└── assets/          # (vide — images servies depuis CDN)
```

## Performance

Objectif Lighthouse 100/100 (desktop) :

- `loading="lazy"` + `decoding="async"` sur toutes les images hors LCP
- `fetchpriority="high"` + `preload` sur le hero
- `preconnect` + `dns-prefetch` vers le CDN images
- Fonts système (pas de fetch bloquant Google Fonts)
- JS `defer`, aucune lib tierce, scroll/parallax en `requestAnimationFrame` + `passive`
- `prefers-reduced-motion` respecté

## Développement

```bash
python3 -m http.server 8080
# puis http://localhost:8080
```

## Licence

Code : MIT. Photos : licence Unsplash (démonstration — à remplacer par les shoots réels).

# Category Reference

After running migrations, these categories will be available:

| ID | Name | Description |
|----|------|-------------|
| 1 | Fiction | Fictional stories and novels |
| 2 | Non-Fiction | Real-world topics and facts |
| 3 | Science | Scientific books and research |
| 4 | Technology | Tech, programming, and computing |
| 5 | History | Historical events and biographies |
| 6 | Biography | Life stories of notable people |
| 7 | Self-Help | Personal development and growth |
| 8 | Business | Business and entrepreneurship |
| 9 | Philosophy | Philosophical thoughts and ideas |
| 10 | Psychology | Human mind and behavior |
| 11 | Education | Educational and academic books |
| 12 | Health | Health, fitness, and wellness |
| 13 | Art | Art, design, and creativity |
| 14 | Religion | Religious and spiritual texts |
| 15 | Travel | Travel guides and adventures |
| 16 | Cooking | Recipes and culinary arts |
| 17 | Poetry | Poems and poetic works |
| 18 | Drama | Plays and dramatic works |
| 19 | Comics | Comic books and graphic novels |
| 20 | Children | Books for children |

## Usage in Frontend

The category IDs (1-20) are used in the upload form dropdown and should match the backend database IDs after migration.

## Adding New Categories

To add new categories:
1. Add to backend via Django admin or create a new migration
2. Update the frontend dropdown in `/client/src/pages/Upload.tsx`

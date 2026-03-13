/** Icon references from external sprite. SVG is built into assets/ by Vite. */
import spriteUrl from "../assets/sprite.svg?url";

const SPRITE = spriteUrl;

/**
 * Returns SVG markup that references an icon from the sprite.
 * @param {string} id - Symbol id (e.g. 'icon-heart', 'icon-heart-outline')
 * @param {string} size - CSS class for size: 'icon--18', 'icon--20', 'icon--22', 'icon--24'
 */
export function icon(id, size = "icon--20") {
  return `<svg class="icon ${size}" aria-hidden="true"><use href="${SPRITE}#${id}"></use></svg>`;
}

// Layout of the ultrawide monitor's display (scene coordinates).
export const SCREEN = { x: 1000, y: 340, w: 390, h: 236 };

// Left part of the screen where the engine / DAW apps take turns; the code editor sits to its right.
export const APP_W = 250;
export const DOCK_H = 10;
export const APP = { x: SCREEN.x, y: SCREEN.y, w: APP_W, h: SCREEN.h - DOCK_H };

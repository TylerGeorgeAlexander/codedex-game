The game canvas in the style.css seems to have the main issue.

Either the max-width and max-height of the #canvas-container 

OR

#gameCanvas with the display: block;

Possibly the display: flex of the canvas-container

Some solutions could be removing the max width and height, then adding media queries for custom resolutions for iphone, ipad, desktop, etc.

Look into how to force phone or smaller resolution screens into rotation or landscape.

Don't forget about photopea

1105 x 1320 = start background island


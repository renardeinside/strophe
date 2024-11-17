

prepare-publishing-assets:
	@echo "Preparing assets for publishing..."
	magick mogrify -resize 1280x800! -density 72 -depth 24 -format png assets/screenshots/*.*
	magick mogrify -resize 440x280! -density 72 -depth 24 -format png assets/small_tile.png
	magick mogrify -resize 1400x560! -density 72 -depth 24 -format png assets/marquee.png
	@echo "Assets prepared for publishing."
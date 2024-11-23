

prepare-publishing-assets:
	@echo "Preparing assets for publishing..."
	magick mogrify -resize 1280x800! -density 72 -depth 24 -format png assets/screenshots/*.*
	magick convert -resize 128x128! -density 72 -depth 24 -format png public/logo.svg assets/logo-128.png
	magick mogrify -resize 440x280! -density 72 -depth 24 -format png assets/small_tile.png
	magick mogrify -resize 1400x560! -density 72 -depth 24 -format png assets/marquee.png
	@echo "Assets prepared for publishing."

release-candidate: 
	@echo "Release candidate $(version)..."
	yarn bump $(version)
	yarn package
	git add .
	git commit -m "Release candidate $(version)"
	git tag -a $(version) -m "Release candidate $(version)"
	git push --follow-tags


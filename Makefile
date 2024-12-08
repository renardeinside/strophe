
generate-favicons:
	@echo "Generating favicons..."
	magick convert -density 1200 -background none public/logo.svg -resize 16x16 public/favicon-16x16.png
	magick convert -density 1200 -background none public/logo.svg -resize 32x32 public/favicon-32x32.png
	magick convert -density 1200 -background none public/logo.svg -resize 48x48 public/favicon-48x48.png
	magick convert -density 1200 -background none public/logo.svg -resize 64x64 public/favicon-64x64.png
	magick convert -density 1200 -background none public/logo.svg -resize 96x96 public/favicon-96x96.png
	magick convert -density 1200 -background none public/logo.svg -resize 128x128 public/favicon-128x128.png
	magick convert -density 1200 -background none public/logo.svg -resize 256x256 public/favicon-256x256.png
	@echo "Favicons generated."

prepare-publishing-assets:
	@echo "Preparing assets for publishing..."
	magick mogrify -resize 1280x800! -density 1200 -depth 24 -format png assets/screenshots/*.*
	magick convert -resize 128x128! -background none -density 1200 -depth 24 -format png public/logo.svg assets/logo-128.png
	magick mogrify -resize 440x280! -density 1200 -depth 24 -format png assets/small_tile.png
	magick mogrify -resize 1400x560! -density 1200 -depth 24 -format png assets/marquee.png
	@echo "Assets prepared for publishing."

release-candidate: 
	@echo "Release candidate $(version)..."
	yarn bump $(version)
	yarn package
	git add .
	git commit -m "Release candidate $(version)"
	git tag -a $(version) -m "Release candidate $(version)"
	git push --follow-tags


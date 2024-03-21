#include <stdio.h>
#include <stdlib.h>
#include <png.h>

png_infop info_ptr;  // <-- Global info_ptr (good)
png_bytepp row_pointers = NULL;

void print_img() {
  FILE * out;
  out = fopen("color_test.ppm", "wb");
  fprintf(out, "P6 256 256 255\n");
  for(int r=0; r<256; r++) {
    for(int b=0; b<256; b++) {
      fputc(r, out);
      fputc(0, out);
      fputc(b, out);
    }
  }
  fclose(out);
}

void read_img(char* path_img) {
	FILE *fp = fopen(path_img, "rb");
    fseek(fp, 0, SEEK_END);
    long int length = ftell(fp);
    rewind(fp);

    char *file_data = (char *)malloc((length));
    fread(file_data, length, 1, fp);
	for(int i = 0; i < length; i++) {
		printf("%x ",file_data[i]);
	}

    fclose(fp);
}

void read_png(char *file_name)
{
    FILE *fp = fopen(file_name, "rb");
    png_structp png_ptr = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
    info_ptr = png_create_info_struct(png_ptr);  
    png_init_io(png_ptr, fp);
    png_read_png(png_ptr, info_ptr, PNG_TRANSFORM_IDENTITY, NULL);
    row_pointers = png_get_rows(png_ptr, info_ptr);
    png_destroy_read_struct(&png_ptr, NULL, NULL); 
    fclose(fp);
}

void process_png_file(char *filename) {
	 FILE *fp = fopen(filename, "rb");
	png_structp png = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
	if(!png) abort();

	png_infop info = png_create_info_struct(png);
	if(!info) abort();

	if(setjmp(png_jmpbuf(png))) abort();

	png_init_io(png, fp);

	png_read_info(png, info);

	int width = png_get_image_width(png, info);
	int height = png_get_image_height(png, info);
	png_byte color_type = png_get_color_type(png, info);
	png_byte bit_depth  = png_get_bit_depth(png, info);
	printf("w : %d, h : %d \n",width,height);
	(void) color_type;
	(void) bit_depth;

	for(int y = 0; y < height; y++) {
		png_bytep row = row_pointers[y];
		(void) row;
		for(int x = 0; x < width; x++) {
			//png_bytep px = &(row[x * 4]);
			//(void) px;
			// Do something awesome for each pixel here...
			//printf("%4d, %4d = RGBA(%3d, %3d, %3d, %3d)\n", x, y, px[0], px[1], px[2], px[3]);
		}
	}
}

int main(int argc, char* argv[])
{
	(void) argc;
	(void) argv;
	//print_img();
	//read_img(argv[1]);
    process_png_file(argv[1]);
    return 0;
}

#include "libpng_example.h"


int main(int argc, char *argv[]) {
  if(argc != 3) abort();

  read_png_file(argv[1]);
  process_png_file();
  write_png_file(argv[2]);

  return 0;
}
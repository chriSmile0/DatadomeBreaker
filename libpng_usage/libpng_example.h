#ifndef LIBPNG_EXAMPLE_H
#define LIBPNG_EXAMPLE_H 


/*
 * A simple libpng example program
 * http://zarb.org/~gc/html/libpng.html
 *
 * Modified by Yoshimasa Niwa to make it much simpler
 * and support all defined color_type.
 *
 * To build, use the next instruction on OS X.
 * $ brew install libpng
 * $ clang -lz -lpng16 libpng_test.c
 *
 * Copyright 2002-2010 Guillaume Cottenceau.
 *
 * This software may be freely redistributed under the terms
 * of the X11 license.
 *
 */

#include <png.h>
#include <stdio.h>
#include <stdlib.h>

int width, height;
png_byte color_type;
png_byte bit_depth;
png_bytep *row_pointers;

/**
 * @brief
 * @param 
 * @return 
*/
void read_png_file(char *filename);

/**
 * @brief
 * @param 
 * @return 
*/
void process_png_file();

/**
 * @brief
 * @param 
 * @return 
*/
void write_png_file(char *filename);

#endif // LIBPNG_EXAMPLE_H // 
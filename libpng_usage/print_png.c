#include "libpng_example.h"
#include "print_png.h"
#include "colors.h"

void print_png(char *filename) {
	read_png_file(filename);
	process_read_home();
}
void test() {
	printf("HEgello \n");
}

int min(int v1, int v2) {
	return v1 < v2 ? v1 : v2;
}

int max(int v1, int v2) {
	return v1 > v2 ? v1 : v2;
}

int max_3(int v1, int v2, int v3) {
	int m_1 = max(v1,v2);
	return (m_1 < v3) ? v3 : m_1;
}

bool is_orange(int b1, int b2, int b3) { // OK -> perfect !!
	if((b1 <= 255 && b1 >= 180) && (b2 < 220 && b2 > 122) && ((b3 < 170) && (b3 > 0)))
		return true;
	return false;
}

bool more_precise_is_orange(int b1, int b2, int b3) {
	if((b1 <= 255 && b1 > 150) && (b2 < 200 && b2 > 100) && (b3 < 90))
		return true;
	return false;
}

bool is_gray(int b1, int b2, int b3) { // OK 
	if((b1 + 10 > 255) || (b2 + 10 > 255) || (b3 + 10 > 255))
		return false;
	/*if(((b1 - 50 <= b2) && (b1 + 50 >= b2)) && ((b2 - 50 <= b3) && (b2 + 50 >= b3))
		&& ((b3 - 50 <= b1) && (b3 + 50 >= b1)))
		return true;*/
	if((b1 < 150 && b1 > 90 ) && (b2 < 150 && b2 > 90 ) && (b3 < 150 && b3 > 90 ))
		return true;
	/*int max = max_3(b1,b2,b3);
	if((max < 220) && (max > 50)) {
		if(max == b1) {
			if((b2 + 10 >= b1) && (b3 + 10 >= b1))
				return true;
		}
		if(max == b2) {
			if((b1 + 10 >= b2) && (b3 + 10 >= b2))
				return true;
		}
		if(max == b3) {
			if((b2 + 10 >= b3) && (b1 + 10 >= b3))
				return true;
		}
	}*/
	return false;
}

bool more_precise_is_gray(int b1, int b2, int b3) {
	if((b1 + 10 > 255) || (b2 + 10 > 255) || (b3 + 10 > 255))
		return false;
	/*if(((b1 - 50 <= b2) && (b1 + 50 >= b2)) && ((b2 - 50 <= b3) && (b2 + 50 >= b3))
		&& ((b3 - 50 <= b1) && (b3 + 50 >= b1)))
		return true;*/
	if((b1 < 115 && b1 > 60 ) && (b2 < 120 && b2 > 50 ) && (b3 < 120 && b3 > 50))
		return true;
	return false;
}

bool is_white(int b1, int b2, int b3) {
	if((b1 < 256 && b1 > 200 ) && (b2 < 256 && b2 > 200 ) && (b3 < 256 && b3 > 200 ))
		return true;
	return false;
}

bool is_lightgray(int b1, int b2, int b3) {
	if((b1 < 220 && b1 > 150 ) && (b2 < 220 && b2 > 150 ) && (b3 < 220 && b3 > 150 ))
		return true;
	return false;
}


bool is_opacity(int b4) {
	if(b4 < 255 && (b4 > 0))
		return true;
	return false;
}

void process_read_home() {
	int ecart = -1; 
	int debut_column = 2; // cut white band
	int debut_row = 2; 	// cut white band
	//bool end = false; stop the loop when the dst is find 
	for(int y = debut_row; y < height ; y++) {
		png_bytep row = row_pointers[y];
		int cpt_o = 0;
		int cpt_g = 0;
		bool valid_line = false;
		int dep = debut_column;
		(void) dep;
		(void) valid_line;
		int x = debut_column;
		for(x = debut_column; x < width; x++) {
			png_bytep px = &(row[x * 4]);
			if(is_orange(px[0],px[1],px[2]) && (!more_precise_is_gray(px[0],px[1],px[2])) && (!is_white(px[0],px[1],px[2]))) {
				//printf("%4d, %4d = RGBA(%3d, %3d, %3d, %3d)|", x, y, px[0], px[1], px[2], px[3]);
				printf("x");//printf("%4d,%4d,%4d|",px[0],px[1],px[2]); 
				cpt_o++;
				if((cpt_o > 20) && (!valid_line)) {
					valid_line = true;
					dep = x - cpt_o - 10;
				}
			}
			else if(more_precise_is_gray(px[0],px[1],px[2]) && !is_orange(px[0],px[1],px[2])) {
				printf("o");
				if(cpt_o > 20 && (cpt_g == 20)) {
					if(ecart == -1) {
						ecart = x - 21 - dep;
						//end = true;
					}
				}
				cpt_g++;
				
			}
			else {
				if(cpt_o > 0) 
					cpt_g = 0;
				printf(" ");///printf("%4d,%4d,%4d|",0,0,0);	
				//printf("%d",((px[1]<10) ? px[1] : (px[1]<100) ? px[1]/10 : px[1]/100));
			}
		}

		printf("\n");
	}
	//-- MOUVEMENT TO MAKE WITH THE SLIDER -- //
	//int mouvement = (index_c > 0) ? tab_columns_motifs[0] : 0;
	int mouvement = ecart;
	printf("ECART ENTRE SRC ET DST = %d px\n",mouvement);
}



int main(int argc, char *argv[]) {
	if(argc != 2) abort();
	//test();
	print_png(argv[1]);
	/*printf("%d\n",max_3(1,2,3));
	printf("%d\n",max_3(1,3,2));
	printf("%d\n",max_3(3,2,1));*/
	return 0;
}
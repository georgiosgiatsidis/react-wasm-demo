#include <stdint.h>
#include <stdlib.h>

void grayscale(uint8_t *image, int width, int height)
{
    for (int i = 0; i < width * height * 4; i += 4)
    {
        uint8_t r = image[i];
        uint8_t g = image[i + 1];
        uint8_t b = image[i + 2];
        uint8_t gray = (r + g + b) / 3;

        image[i] = image[i + 1] = image[i + 2] = gray;
    }
}

void sepia(uint8_t *image, int width, int height)
{
    for (int i = 0; i < width * height * 4; i += 4)
    {
        uint8_t r = image[i];
        uint8_t g = image[i + 1];
        uint8_t b = image[i + 2];

        uint8_t tr = (uint8_t)(0.393 * r + 0.769 * g + 0.189 * b);
        uint8_t tg = (uint8_t)(0.349 * r + 0.686 * g + 0.168 * b);
        uint8_t tb = (uint8_t)(0.272 * r + 0.534 * g + 0.131 * b);

        image[i] = (tr > 255) ? 255 : tr;
        image[i + 1] = (tg > 255) ? 255 : tg;
        image[i + 2] = (tb > 255) ? 255 : tb;
    }
}

void invert(uint8_t *image, int width, int height)
{
    for (int i = 0; i < width * height * 4; i += 4)
    {
        image[i] = 255 - image[i];
        image[i + 1] = 255 - image[i + 1];
        image[i + 2] = 255 - image[i + 2];
    }
}

void blur(uint8_t *image, int width, int height)
{
    int kernel[3][3] = {
        {1, 1, 1},
        {1, 1, 1},
        {1, 1, 1}};
    int kernelSize = 3;
    int kernelSum = 9;

    uint8_t *temp = (uint8_t *)malloc(width * height * 4);

    for (int y = 1; y < height - 1; y++)
    {
        for (int x = 1; x < width - 1; x++)
        {
            int r = 0, g = 0, b = 0;
            for (int ky = 0; ky < kernelSize; ky++)
            {
                for (int kx = 0; kx < kernelSize; kx++)
                {
                    int pixelIndex = ((y + ky - 1) * width + (x + kx - 1)) * 4;
                    r += image[pixelIndex] * kernel[ky][kx];
                    g += image[pixelIndex + 1] * kernel[ky][kx];
                    b += image[pixelIndex + 2] * kernel[ky][kx];
                }
            }
            int index = (y * width + x) * 4;
            temp[index] = r / kernelSum;
            temp[index + 1] = g / kernelSum;
            temp[index + 2] = b / kernelSum;
            temp[index + 3] = image[index + 3];
        }
    }

    for (int i = 0; i < width * height * 4; i++)
    {
        image[i] = temp[i];
    }

    free(temp);
}
# Product Key Template

This program is a web app designed specifically for a customer importing a large inventory from an ERP to a WordPress website. Their products, mostly water pumps, have a lot of unique attributes that may not be supported by the ERP. Working with the company, we created a _product key_ that stored all the important data in a single string. The product key string is ugly and sometimes hard to understand. To avoid mistakes and imporve ease of use, I created this web app designed to generate and create product keys quickly and easily.

## Installation

This program was made for a non-coding customer. As such, installation and usage are straightforward. Once the files have been downloaded, simply open the index.html folder on an internet browser. 

## Usage

First you must upload a file with the prerequisite fields. You can find a sample file in the _Samples_ folder titled "sample.csv". These fields are saved in the ERP as well.

The app has two main functions: Generating and Adding Product Keys.

### Gerating Product Keys

Once the file is uploaded, select the "Generate Keys" option and click "Run". This will automatically create product keys by looking for data in the title and description of the product. Some data will be missing but it is the quickest way to create a product key. If the product key already had some data stored, it will not be rewritten.

### Adding Product Keys

Selecting the "Add Keys" button and clicking "Run" will automatically try to generate key values before letting you add them manually. This speeds up the process significantly. The key values are added through simple input windows and the products are iterated with the "Next" button. There is an option selected with a checkmark to copy the empty values from the previous product. This is used because the products are usually imported in groups in which the products are mostly similar with just a few different values. 

### Filter and Replace

These are simple tools used to filter or replace text in a specific column, useful for quick fixes in the inventory.


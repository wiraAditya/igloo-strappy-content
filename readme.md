# Igloohome Strapi Content

## Description

This project is used to generate and retrieve JSON files for Indra and also to push content to Strapi.

### Project Setup

First, run `npm install`.  
Next, create a `.env` file and fill it with the key and API URL.  
The expected variables are:

- `AUTH_STRAPI`
- `API_URL`

## Table of Contents

- [Generating JSON](#generate-json)
- [Pushing the Translation](#push-translation)

## Installation

Provide step-by-step instructions on how to install and set up your project.

## Generate JSON

1. Navigate to the `src/generate-json` directory and run `npx tsx generate-all.ts` to generate all English JSON data from Strapi (including drafted content).
2. To generate English JSON data from drafted Strapi content, run `npx tsx generate-untranslated.ts`.
3. All generated English JSON files will be located in the `generated` folder.

## Push Translation

1. Place the translation files in the `translate` folder and group them by folder name. Do not change the folder names.
2. Navigate to the `src/push-content` directory and run `npx tsx main.ts`.
3. Wait until the process completes, then check the Strapi content to ensure the data has been successfully inserted.

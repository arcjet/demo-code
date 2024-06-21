# MerlinBot

This is a [Next.js](https://nextjs.org/) project that connects to [OpenAI's API](https://platform.openai.com/) to provide an AI bot experience with an artificial wizard named Merlin. In order to avoid overload or bot activity, [Arcjet](https://arcjet.com)'s Rate Limit and Bot Detection features are implemented.

## Setup

To get this project up and running, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/arcjet/demo-code
    cd demo-code/merlin-bot
    ```

2. Install the dependencies

    ```bash
    npm install
    # or
    yarn install
    ```

3. Copy `.env.local.example` to `.env.local and replace `YOUR-OPENAI-API-KEY` and `YOUR-ARCJET-KEY` with your actual API keys:

    > To obtain the OpenAI API key, [sign up on the OpenAI website](https://platform.openai.com/). After signing up, navigate to the [API Keys section](https://platform.openai.com/api-keys) and generate a new API key.

    > To obtain the Arcjet key, [sign up on the Arcjet website](https://arcjet.com/). After signing up, create a new site, and get your `Site key` from the "SDK Installation" tab of your dashboard.

4. Run the development server

    ```bash
    npm run dev
    # or
    yarn dev
    ```

Open http://localhost:3000 with your browser to see the result.
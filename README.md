# Assess & Align

A web application helping Black voluntary sector leaders in the UK evaluate research requests on Black mental health.

## Project Overview

Assess & Align ensures that research aligns with principles of equity, collaboration, and cultural sensitivity while also educating researchers about power imbalances in research practices. The application analyzes research requests, asks key questions about equity and collaboration, generates feedback for researchers, and aggregates anonymized data to track the impact of research demands on the sector.

## Key Features

- Research request analysis and scraping
- Equity-focused assessment framework 
- LLM-powered feedback generation
- Email integration for request submission
- Analytics dashboard for impact tracking
- Modern neumorphic UI design

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js/Express
- **Database**: NoCoDB
- **Authentication**: Supabase Auth
- **LLM Integration**: Deepseek V3

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- NoCoDB instance
- Supabase account
- Deepseek API access

### Installation

1. Clone the repository:
```
git clone https://github.com/your-username/assess-and-align.git
cd assess-and-align
```

2. Install dependencies:
```
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables:
```
# In backend directory
cp .env.example .env
```
Edit the `.env` file with your configuration details.

4. Start the development servers:
```
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js/Express backend
- `docs/` - Project documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Black voluntary sector leaders who provided feedback and guidance
- All contributors to the development of this tool
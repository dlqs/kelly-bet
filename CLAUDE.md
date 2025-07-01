# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A simple client-side mobile-friendly website that calculates optimal bet sizing using the Kelly Criterion. Users input market implied probability and their estimated probability to get the recommended bet percentage.

## Architecture

- **Pure HTML/CSS/JavaScript** - No build tools or frameworks required
- **Single page application** - All functionality in index.html
- **Mobile-first responsive design** - Works on all screen sizes
- **Client-side only** - No server or backend required

## Kelly Criterion Formula

The Kelly Criterion calculates optimal bet size as:
```
Kelly % = (bp - q) / b
```
Where:
- b = odds received (calculated from market probability)
- p = your estimated probability of winning
- q = probability of losing (1 - p)

## Key Features

- Simple two-input form (market probability, estimated probability)
- Real-time calculation and display of Kelly percentage
- Mobile-friendly interface with large touch targets
- Input validation and error handling
- Clear explanation of results

## File Structure

- `index.html` - Complete single-file application
- No external dependencies or build process required

## Development Notes

Keep the interface minimal and focused on the core calculation. Prioritize usability on mobile devices with clear labels and adequate spacing for touch interactions.
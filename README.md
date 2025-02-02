# Frontend Challenge

Hello! This repo is my take on the frontend challenge presented by Natural Cycles.

The goal of the challenge is to present a UI containing a title and a timer which are connected to
two inputs. The text of both UI elements should adapt dynamically to the width of the page. The
following logic requirements were extracted from the assignment:

- The UI should work in portrait and landscape mode.
- The text should always fit the whole viewport, on resize and new user input.
- The values selected by the user should persist on page reload.
- Should follow the design in the provided Figma link.

## Local setup

_Note: These instructions are provided with Windows in mind._

1. Make sure you are on the compatible Node version.
2. Then install the required packages with `npm i`.

Once that is done, you can start up the app with `npm run start`. You are ready to go! 🚀
http://localhost:4200/

## Suggestions for production readiness! ✨

To be production-ready, I would recommend using a time library to assist with the countdown
calculations. Date/times can be finicky, as would become apparent if launched to production as is;
timezones, summer/winter time, and region could be problematic.

---

Simple test scaffolding was added with Jest, but these should ideally be expanded into more robust
coverage.

---

As this is a prototype, scope was limited to basic functionality and design. To be production-ready,
a review with a designer would also be ideal to discuss matters such as:

- Text size change animation
- Initial form values
- Placeholder text
- Form validation (specifically for date)

---

Suggestion to update the wording from `to` to `until` to avoid possible disappointment.

![NC meme](https://imgur.com/bvd1t6x.gif)

## AI clause

This assignment was done without the direct use of AI tools. However, after some deliberation and to
stay up to date with available technologies, GitHub Copilot was asked as a last step to code review.
The usage was intended for minor cleanups and to reduce overhead for any PR reviewer.

Further use of AI should be discussed and decided by the team.

### Adopted GitHub Copilot suggestions

`ncx-countdown.component.ts`

- Added return types to methods for better type safety.
- Optimized the `startCountDown` method to avoid redundant calculations.

  Before:

  ```typescript
  const timeDiffFuture = targetDate.getTime() - Date.now()
  const timeDiffPast = targetDate.getTime() + Date.now()
  const isFuture = targetDate.getTime() > Date.now()
  ```

`time-converter.service.ts`

- Used more descriptive variable names.

`dynamic-font-size.directive.ts`

- Added type annotations for better type safety.

For both `LocalStorageService` and `TimeConverterService` codepilot mentions error fallback which
would be a good point to add to "production readiness".

import { configs } from "eslint-plugin-wc"

export default [
  configs.recommended,
  {
    ...configs.recommended,
    files: ["test/**/*.js"],
  },
]

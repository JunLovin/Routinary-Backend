# Contributing to Routinary Backend

Thank you for considering contributing to Routinary! This document provides guidelines for contributing to the project.

---

## 🎯 How to Contribute

### 1. Fork the Repository

Click the "Fork" button at the top right of this repository.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/Routinary-Backend.git
cd Routinary-Backend
```

### 3. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 4. Make Your Changes

- Follow the existing code style
- Write clear, descriptive commit messages
- Add tests if applicable
- Update documentation if needed

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

**Commit message format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### 6. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

Go to the original repository and click "New Pull Request".

---

## 📋 Code Guidelines

### TypeScript

- Use TypeScript for all new code
- Prefer `interface` for object types
- Use `type` for unions, utility types, and complex types
- Always type function parameters and return values

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use `async/await` over callbacks
- Use `const` by default, `let` when reassignment is needed
- Use descriptive variable names

### Project Structure
```typescript
// ✅ Good
export const createUser = async (data: CreateUserDTO) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({ data: { ...data, password: hashedPassword } });
}

// ❌ Avoid
export const createUser = async (d) => {
  let p = await bcrypt.hash(d.password, 10);
  return await prisma.user.create({ data: { ...d, password: p } });
}
```

### Error Handling

- Always use `AppError` for custom errors
- Use `asyncHandler` wrapper for async route handlers
- Provide clear, user-friendly error messages
```typescript
// ✅ Good
if (!user) {
  throw new AppError("User not found", 404);
}

// ❌ Avoid
if (!user) {
  throw new Error("User not found");
}
```

### Validation

- Use Zod schemas for all input validation
- Define schemas in `src/schemas/`
- Use the `validate` middleware in routes
```typescript
// ✅ Good
router.post('/register', validate(registerSchema), AuthController.register);

// ❌ Avoid manual validation in controllers
```

---

## 🧪 Testing

Before submitting a PR:

1. Test all endpoints with Postman/Insomnia
2. Ensure no TypeScript errors: `npm run build`
3. Check code formatting
4. Verify database migrations work

---

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment (OS, Node version, etc.)
- Screenshots/logs if applicable

---

## 💡 Feature Requests

We welcome feature suggestions! Please:

- Check if the feature already exists in issues
- Describe the problem it solves
- Provide examples or mockups if possible

---

## 📝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's guidelines

---

## ❓ Questions

If you have questions, feel free to:

- Open an issue with the `question` label
- Reach out to [@JunLovin](https://github.com/JunLovin)

---

## 🙏 Thank You

Every contribution, no matter how small, is valued and appreciated!

---

<p align="center">Happy coding! 🚀</p>

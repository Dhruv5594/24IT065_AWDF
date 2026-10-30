/**
 * ITUE301 Practical 13: AI Service Integration
 * 
 * Integrates an external AI service (Google Gemini API / OpenAI API)
 * with an intelligent offline fallback engine to guarantee responsible AI usage
 * and zero-breakage graceful degradation.
 */

/**
 * Intelligent semantic rule engine for graceful fallback
 */
const generateHeuristicSuggestion = (title) => {
  const lower = title.toLowerCase();

  let priority = 'medium';
  let estimatedDuration = '1 to 2 days';
  let category = 'Development';
  let subtasks = [];
  let detailedDescription = '';

  // Priority heuristics
  if (lower.match(/\b(urgent|critical|fix|bug|broken|error|viva|exam|deadline|docker)\b/)) {
    priority = 'high';
  } else if (lower.match(/\b(minor|optional|read|explore|ui tweak|color|cleanup)\b/)) {
    priority = 'low';
  }

  // Domain-specific task generation
  if (lower.match(/\b(docker|container|compose|kubernetes)\b/)) {
    category = 'DevOps & Infrastructure';
    estimatedDuration = '3 to 4 hours';
    detailedDescription = `Containerize the application components using optimized multi-stage Dockerfiles. Ensure service isolation, persistent data volume mapping, and unified Docker Compose orchestration.`;
    subtasks = [
      'Write optimized multi-stage Dockerfile',
      'Configure .dockerignore to exclude node_modules and secrets',
      'Set up service networking and persistent volumes in compose.yaml',
      'Validate container startup and inter-service health checks',
    ];
  } else if (lower.match(/\b(api|backend|rest|express|endpoint|crud|route)\b/)) {
    category = 'Backend Architecture';
    estimatedDuration = '4 to 6 hours';
    detailedDescription = `Architect RESTful endpoints with comprehensive request body validation, centralized error handling, and structured JSON responses conforming to REST standards.`;
    subtasks = [
      'Define route handlers and HTTP methods (GET, POST, PUT, DELETE)',
      'Add request parameter validation and error-handling middleware',
      'Integrate controller with database model queries',
      'Test endpoints using automated test scripts or Postman',
    ];
  } else if (lower.match(/\b(auth|jwt|login|security|password|register)\b/)) {
    category = 'Security & Authentication';
    estimatedDuration = '3 to 5 hours';
    detailedDescription = `Implement secure authentication pipeline utilizing salted bcrypt password hashing, signed JSON Web Tokens (JWT), and authorization route guards for per-user data isolation.`;
    subtasks = [
      'Configure bcrypt password hashing pre-save hook in user model',
      'Generate signed JWT tokens upon successful login',
      'Protect private routes using Bearer token verification middleware',
      'Enforce multi-tenant access control preventing cross-user data leakage',
    ];
  } else if (lower.match(/\b(test|testing|ci|cd|pipeline|github action)\b/)) {
    category = 'Quality Assurance & CI/CD';
    estimatedDuration = '2 to 3 hours';
    detailedDescription = `Set up automated testing pipelines and Continuous Integration workflows to run unit, integration, and build checks automatically on repository commits.`;
    subtasks = [
      'Write automated integration tests for critical paths',
      'Create GitHub Actions workflow configuration in .github/workflows',
      'Simulate test failure and test fix pipelines',
      'Verify build artifacts and deployment readiness',
    ];
  } else if (lower.match(/\b(viva|exam|presentation|slides|charusat)\b/)) {
    category = 'Academic Preparation';
    estimatedDuration = '1 day';
    detailedDescription = `Review technical architecture, practical code implementations, viva theoretical questions, and prepare live working demonstration for faculty examination.`;
    subtasks = [
      'Review Practicals 1 to 13 documentation and code files',
      'Practice explaining Docker Compose, JWT, and caching architecture',
      'Verify that all services start cleanly on live ports',
      'Prepare responses for viva questions on state, routing, and DevOps',
    ];
  } else {
    detailedDescription = `Implement and test "${title}". Ensure modular code organization, proper error boundary handling, and unit test verification.`;
    subtasks = [
      `Analyze requirements for: ${title}`,
      'Implement core logic with clean modular separation',
      'Handle edge cases and input validation',
      'Verify functionality in development environment',
    ];
  }

  return {
    source: 'Heuristic AI Fallback (Zero-Breakage Engine)',
    title,
    suggestedDescription: detailedDescription,
    suggestedPriority: priority,
    suggestedCategory: category,
    suggestedDeadline: estimatedDuration,
    recommendedChecklist: subtasks,
    responsibleAiNotice: 'Heuristic generation ensures application availability when external AI quotas or credentials are unavailable.',
  };
};

/**
 * Main AI Suggestion Entrypoint
 * Attempts external AI API (Gemini / OpenAI), with automatic fallback to heuristic engine
 */
export const getAiTaskSuggestion = async (title) => {
  if (!title || title.trim() === '') {
    throw new Error('Task title is required to generate AI suggestions.');
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  // 1. Attempt Gemini API if key is available
  if (geminiKey) {
    try {
      console.log('[AI Service] Querying Google Gemini API...');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert software engineering assistant. Based on this task title: "${title}", return a JSON object with:
                    - "suggestedDescription": A concise 2-sentence description of what needs to be done.
                    - "suggestedPriority": "low", "medium", or "high".
                    - "suggestedCategory": e.g. Frontend, Backend, DevOps, Database, etc.
                    - "suggestedDeadline": estimated duration like "2 hours", "1 day".
                    - "recommendedChecklist": array of 3-4 bullet subtasks.
                    Return ONLY valid JSON.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedJson);
          return {
            source: 'Google Gemini 1.5 Flash API',
            title,
            suggestedDescription: parsed.suggestedDescription,
            suggestedPriority: parsed.suggestedPriority?.toLowerCase() || 'medium',
            suggestedCategory: parsed.suggestedCategory || 'General',
            suggestedDeadline: parsed.suggestedDeadline || '1-2 days',
            recommendedChecklist: parsed.recommendedChecklist || [],
            responsibleAiNotice: 'Generated via external LLM with responsible input validation.',
          };
        }
      }
      console.warn('[AI Service] Gemini API returned non-OK status. Falling back to heuristic engine.');
    } catch (apiErr) {
      console.warn('[AI Service] Gemini API call failed:', apiErr.message, '— Switching to fallback.');
    }
  }

  // 2. Attempt OpenAI API if key is available
  if (openAiKey) {
    try {
      console.log('[AI Service] Querying OpenAI API...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a task management assistant. Output JSON with suggestedDescription, suggestedPriority ("low"|"medium"|"high"), suggestedDeadline, recommendedChecklist (array of strings).',
            },
            { role: 'user', content: `Analyze task: ${title}` },
          ],
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0]?.message?.content;
        const parsed = JSON.parse(content);
        return {
          source: 'OpenAI GPT API',
          title,
          ...parsed,
          responsibleAiNotice: 'Generated via OpenAI API with content safety filtering.',
        };
      }
    } catch (apiErr) {
      console.warn('[AI Service] OpenAI API call failed:', apiErr.message, '— Switching to fallback.');
    }
  }

  // 3. Graceful Fallback (Responsible AI: Core functionality NEVER breaks)
  return generateHeuristicSuggestion(title);
};

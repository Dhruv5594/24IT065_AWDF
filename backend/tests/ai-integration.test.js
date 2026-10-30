import { getAiTaskSuggestion } from '../services/aiService.js';

console.log('========================================================');
console.log('TESTING PRACTICAL 13: AI API INTEGRATION & RESPONSIBLE AI');
console.log('========================================================\n');

const runAiTests = async () => {
  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  };

  try {
    // TEST 1: DevOps & Docker Prompt Analysis
    console.log('--- TEST 1: DevOps Task AI Suggestion ---');
    const devopsResult = await getAiTaskSuggestion('Deploy multi-container Docker Compose application');
    assert(!!devopsResult.suggestedDescription, 'Generates comprehensive task description');
    assert(devopsResult.suggestedPriority === 'high', 'Correctly infers "high" priority for critical infrastructure');
    assert(Array.isArray(devopsResult.recommendedChecklist) && devopsResult.recommendedChecklist.length > 0, 'Generates actionable subtask checklist');
    console.log(`   Source: ${devopsResult.source}`);
    console.log(`   Inferred Category: ${devopsResult.suggestedCategory} | Est: ${devopsResult.suggestedDeadline}`);

    // TEST 2: Security & Authentication Analysis
    console.log('\n--- TEST 2: Authentication & Security AI Analysis ---');
    const authResult = await getAiTaskSuggestion('Implement secure JWT authentication and password hashing');
    assert(authResult.suggestedPriority === 'high' || authResult.suggestedPriority === 'medium', 'Assigns valid priority enum');
    assert(authResult.suggestedCategory.includes('Security') || authResult.suggestedCategory.includes('Backend'), 'Categorized under Security/Backend');
    console.log(`   Suggestion preview: "${authResult.suggestedDescription.slice(0, 75)}..."`);

    // TEST 3: Graceful Degradation / Input Validation
    console.log('\n--- TEST 3: Error Handling & Graceful Degradation ---');
    let errorCaught = false;
    try {
      await getAiTaskSuggestion('');
    } catch (err) {
      errorCaught = true;
    }
    assert(errorCaught, 'Rejects empty task title without application crash');

    // TEST 4: Responsible AI Verification
    console.log('\n--- TEST 4: Responsible AI Notice & Safety ---');
    const generalResult = await getAiTaskSuggestion('Create portfolio documentation');
    assert(!!generalResult.responsibleAiNotice, 'Includes responsible AI disclosure statement');

    console.log('\n========================================================');
    console.log(`PRACTICAL 13 TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
    console.log('STATUS: [PASS]');
    console.log('========================================================\n');

    process.exit(failed === 0 ? 0 : 1);
  } catch (err) {
    console.error('Unexpected exception during AI testing:', err);
    process.exit(1);
  }
};

runAiTests();

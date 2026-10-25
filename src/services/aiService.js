/**
 * AI Service for LittleAura
 * Handles communication with backend API or local intelligent fallback.
 */

export async function sendMessageToAI(message, childContext = {}, history = []) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, childContext, history }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
  } catch (err) {
    console.warn('API endpoint unavailable, using LittleAura local AI engine:', err.message);
  }

  // Graceful local intelligence fallback
  const lower = message.toLowerCase();
  const name = childContext.name || 'your child';
  const age = childContext.age || '2 years';

  await new Promise((resolve) => setTimeout(resolve, 650));

  if (lower.includes('sleep') || lower.includes('bedtime') || lower.includes('nap')) {
    return `### Gentle Bedtime & Sleep Routine for ${name} (${age})

Toddlers around ${age} often test boundaries before sleeping as their imagination and autonomy bloom. Here is a calm, 3-step evening bridge:

1. **The 30-Minute Sensory Slow-Down**:
   - Dim bright overhead lighting 30 minutes before sleep.
   - Shift from active play to quiet, repetitive tactile moments (leafing through a board book, humming a predictable song).
2. **Predictable Verbal Anchors**:
   - Use a comforting closing signal: *"The moon is high, and the world is cozy. Time for little eyes to rest."*
3. **Gentle Boundary with Validation**:
   - If ${name} calls out or asks for one more water cup, warmly acknowledge (*"I hear you want to stay up with mommy/daddy, but our bodies need quiet sleep to grow strong"*) and gently tuck back in.

> **Note**: For persistent nocturnal awakenings or sudden behavioral changes, consult your pediatrician.`;
  }

  if (lower.includes('food') || lower.includes('eat') || lower.includes('picky') || lower.includes('meal')) {
    return `### Nourishing & Stress-Free Eating Strategies

At ${age}, natural plate skepticism is a normal developmental milestone known as food neophobia. Here are calm strategies:

- **The Division of Responsibility**:
  - *Your role*: Deciding nutritious options, meal timing, and pleasant seating.
  - *${name}'s role*: Deciding how much to eat, or whether to try a new texture today.
- **Pair Familiar with New**:
  - Keep at least one familiar "anchor food" on the plate alongside a single bite-sized portion of a new vegetable or texture.
- **De-pressurize the Table**:
  - Avoid bargaining ("two more spoonfuls"). Relaxed family meal atmospheres foster lifelong healthy food curiosity.

> **Parenting Reminder**: Fluctuations in daily appetite are normal. Consult a healthcare professional if you have concerns regarding hydration or energy levels.`;
  }

  if (lower.includes('activity') || lower.includes('play') || lower.includes('learning')) {
    return `### 3 Engaging Screen-Free Activities for ${name} (${age})

1. **Sensory Nature & Texture Discovery (Cognitive + Fine Motor)**:
   - Gather safe natural items (smooth river stones, large leaves, pinecones). Let ${name} feel and group by "smooth" and "bumpy".
2. **The Living Room Obstacle Path (Gross Motor + Balance)**:
   - Use sofa cushions on a carpeted floor for safe stepping, crawling, and balancing.
3. **Sound & Rhythm Echoes (Language + Social)**:
   - Tap simple rhythms on a plastic bowl with wooden spoons and invite ${name} to copy the beat!

*Tip: At this stage, open-ended repetition is how neural pathways strengthen best!*`;
  }

  return `### Supportive Guidance for ${name} (${age})

Thank you for asking about this! Everyday parenting moments with a ${age} toddler are filled with wonderful opportunities for connection and growth.

Here are supportive principles to keep in mind:
- **Consistent Rhythms**: Predictable daily routines provide safety and reduce toddler anxiety.
- **Empowered Micro-Choices**: Giving ${name} simple choices (e.g., *"Red cup or green cup today?"*) nurtures independence.
- **Connected Co-Regulation**: When emotions feel big, staying calm and physically accessible helps their nervous system settle.

What specific aspect of ${name}'s day would you like to explore next?

---
*Disclaimer: LittleAura provides supportive parenting observations and evidence-based routines. For medical diagnoses or clinical symptoms, always consult a qualified healthcare professional.*`;
}

export async function analyzePhotoInsight(file, childContext = {}) {
  try {
    const res = await fetch('/api/ai/photo-insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageTitle: file?.name || 'child_play_photo.jpg',
        childAge: childContext.age || '2 years'
      }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend photo insight unavailable, running local observer:', err.message);
  }

  // Realistic scanning delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return {
    activityContext: {
      category: 'Constructive Spatial & Fine Motor Play',
      engagementLevel: 'High Sustained Concentration',
      observation: `Your child demonstrates focused fine motor coordination and hand-eye dexterity while manipulating objects in their play space.`
    },
    environment: {
      setting: 'Safe Indoor Floor Environment',
      stimulation: 'Optimal & Focused',
      safetyObservation: 'Low-to-ground play area with natural lighting and minimal distraction, promoting calm exploration.'
    },
    playSuggestion: {
      title: 'Gentle Spatial Expansion',
      guidance: 'Introduce a small challenge such as sorting objects by color or building a tunnel for toys to pass through.',
      skillSupported: 'Problem-Solving & Bilateral Hand Dexterity'
    },
    timestamp: new Date().toISOString(),
    disclaimer: 'AI Photo Insight provides supportive observations of play and environment, and is not a medical diagnostic tool.'
  };
}

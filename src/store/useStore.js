import { create } from 'zustand';

const useStore = create((set) => ({
  // Core state
  currentStep: 0,
  score: 0,
  
  // Step 2: Checklist
  checklist: {
    pupil: false,
    corneal: false,
    pain: false,
  },
  
  // Step 3: Reflex Results
  reflexes: {
    pupil: null, // 'present' | 'absent'
    corneal: null,
    gag: null,
  },
  
  // Step 3: Apnea
  apnea: {
    completed: false,
    o2Level: 100,
  },
  
  // Step 4: Vitals
  vitalsInterpretation: null, // 'stable' | 'critical' | 'brain death likely'
  
  // Step 5: Diagnosis Decision
  diagnosis: null, // 'yes' | 'no'
  
  // Step 6: Communication
  communication: null, // 'explain' | 'avoid' | 'empathy'
  
  // Actions
  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 7) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  
  updateChecklist: (item) => set((state) => ({
    checklist: { ...state.checklist, [item]: true }
  })),
  
  toggleChecklist: (item) => set((state) => ({
    checklist: { ...state.checklist, [item]: !state.checklist[item] }
  })),
  
  setReflexResult: (reflex, result) => set((state) => ({
    reflexes: { ...state.reflexes, [reflex]: result }
  })),
  
  setApneaCompleted: (completed) => set((state) => ({
    apnea: { ...state.apnea, completed }
  })),
  
  setApneaO2Level: (level) => set((state) => ({
    apnea: { ...state.apnea, o2Level: level }
  })),
  
  setVitalsInterpretation: (interpretation) => set({ vitalsInterpretation: interpretation }),
  
  setDiagnosis: (decision) => set({ diagnosis: decision }),
  
  setCommunication: (choice) => set({ communication: choice }),
  
  calculateScore: () => set((state) => {
    let newScore = 0;
    
    // Checklist completed (3 items)
    if (state.checklist.pupil) newScore += 10;
    if (state.checklist.corneal) newScore += 10;
    if (state.checklist.pain) newScore += 10;
    
    // Reflex tests correct
    // In brain death, reflexes are absent
    if (state.reflexes.pupil === 'absent') newScore += 10;
    if (state.reflexes.corneal === 'absent') newScore += 10;
    if (state.reflexes.gag === 'absent') newScore += 10;
    
    // Apnea test completed
    if (state.apnea.completed) newScore += 10;
    
    // Interpretation correct
    if (state.vitalsInterpretation === 'brain death likely') newScore += 10;
    
    // Diagnosis correct
    if (state.diagnosis === 'yes') newScore += 10;
    
    // Communication correct
    if (state.communication === 'explain' || state.communication === 'empathy') newScore += 10;
    
    return { score: newScore };
  }),
  
  resetStore: () => set({
    currentStep: 0,
    score: 0,
    checklist: { pupil: false, corneal: false, pain: false },
    reflexes: { pupil: null, corneal: null, gag: null },
    apnea: { completed: false, o2Level: 100 },
    vitalsInterpretation: null,
    diagnosis: null,
    communication: null,
  })
}));

export default useStore;

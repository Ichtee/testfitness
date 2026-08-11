/**
 * Exercise Knowledge Base & Alternative Exercise Database
 * Contains muscle targets, form guides, online references, and same-muscle alternative exercises.
 */

export const EXERCISE_DATABASE = {
  // --- PUSH EXERCISES ---
  'pec deck fly': {
    name: 'Pec Deck Fly',
    primaryMuscle: 'Cơ ngực lớn (Pectoralis Major)',
    secondaryMuscles: ['Cơ vai trước (Anterior Deltoid)'],
    equipment: 'Máy Pec Deck / Butterfly Machine',
    instructions: [
      'Điều chỉnh ghế sao cho tay cầm ngang tầm giữa ngực.',
      'Giữ khuỷu tay hơi cong cố định trong suốt chuyển động.',
      'Ép 2 tay vào giữa, siết chặt cơ ngực ở điểm đỉnh trong 1 giây.',
      'Từ từ nhả tay ra sau cảm nhận cơ ngực giãn tối đa.'
    ],
    alternatives: [
      { name: 'Cable Crossover', desc: 'Ép ngực với cáp đôi - kiểm soát lực ép linh hoạt' },
      { name: 'Dumbbell Fly', desc: 'Ép ngực với tạ đơn trên ghế phẳng' },
      { name: 'Machine Chest Fly', desc: 'Máy ép ngực đứng / ngồi' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/pec-deck.html',
    videoSearch: 'Pec Deck Fly proper form guide'
  },
  'incline dumbbell chest press': {
    name: 'Incline Dumbbell Chest Press',
    primaryMuscle: 'Cơ ngực trên (Upper Pectoralis)',
    secondaryMuscles: ['Cơ vai trước (Anterior Deltoid)', 'Cơ tay sau (Triceps)'],
    equipment: 'Ghế dốc lên (30-45 độ) + Tạ đơn',
    instructions: [
      'Chỉnh ghế dốc khoảng 30-45 độ.',
      'Hạ tạ chậm về sát ngực trên, mở rộng lồng ngực.',
      'Đẩy tạ dứt khoát lên trên, tập trung dùng lực cơ ngực trên đẩy.'
    ],
    alternatives: [
      { name: 'Incline Barbell Bench Press', desc: 'Đẩy ngực trên với thanh đòn' },
      { name: 'Smith Machine Incline Press', desc: 'Đẩy ngực trên máy Smith cố định quỹ đạo' },
      { name: 'Incline Chest Press Machine', desc: 'Máy đẩy ngực dốc lên' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/incline-dumbbell-bench-press.html',
    videoSearch: 'Incline Dumbbell Chest Press form guide'
  },
  'shoulder press machine': {
    name: 'Shoulder Press Machine',
    primaryMuscle: 'Cơ vai trước & vai giữa (Deltoids)',
    secondaryMuscles: ['Cơ tay sau (Triceps)', 'Cơ cầu vai trên (Upper Traps)'],
    equipment: 'Máy đẩy vai (Shoulder Press Machine)',
    instructions: [
      'Điều chỉnh ghế sao cho tay cầm ngang chiều cao vai.',
      'Giữ lưng tựa sát vào ghế, đẩy tay cầm lên cao nhưng không khóa khớp khuỷu tay.',
      'Hạ chậm tay cầm xuống ngang tai và lặp lại.'
    ],
    alternatives: [
      { name: 'Dumbbell Shoulder Press', desc: 'Đẩy vai ngồi/đứng với tạ đơn' },
      { name: 'Barbell Military Press', desc: 'Đẩy vai đứng với thanh đòn' },
      { name: 'Smith Shoulder Press', desc: 'Đẩy vai trên máy Smith' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/machine-shoulder-press.html',
    videoSearch: 'Shoulder Press Machine proper execution'
  },
  'chest supported dumbbell lateral raise': {
    name: 'Chest Supported Dumbbell Lateral Raise',
    primaryMuscle: 'Cơ vai giữa (Lateral Deltoid)',
    secondaryMuscles: ['Cơ vai sau (Posterior Deltoid)'],
    equipment: 'Ghế nghiêng nghiêng + Tạ đơn',
    instructions: [
      'Nằm úp ngực vào ghế dốc nghiêng 45 độ để triệt tiêu đà người.',
      'Nâng tạ đơn sang 2 bên vai, giữ khuỷu tay hơi cong.',
      'Tập trung phát lực hoàn toàn từ cơ vai giữa.'
    ],
    alternatives: [
      { name: 'Standing Dumbbell Lateral Raise', desc: 'Dang vai đứng với tạ đơn' },
      { name: 'Cable Lateral Raise', desc: 'Dang vai với dây cáp đơn/đôi' },
      { name: 'Machine Lateral Raise', desc: 'Máy dang vai ngồi' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/dumbbell-lateral-raise.html',
    videoSearch: 'Chest Supported Dumbbell Lateral Raise guide'
  },
  'overhead cable triceps extension': {
    name: 'Overhead Cable Triceps Extension',
    primaryMuscle: 'Cơ tay sau - Đầu dài (Triceps Long Head)',
    secondaryMuscles: ['Cơ tay sau - Đầu ngoài (Triceps Lateral Head)'],
    equipment: 'Dây cáp kéo qua đầu + Dây thừng (Rope Attachment)',
    instructions: [
      'Đứng quay lưng vào máy cáp, kéo dây thừng qua khỏi đầu.',
      'Giữ khuỷu tay cố định hướng về phía trước.',
      'Duỗi thẳng tay sau ra trước để siết chặt cơ tay sau.'
    ],
    alternatives: [
      { name: 'French Press (EZ Bar Overhead Extension)', desc: 'Duỗi tay sau qua đầu với tạ EZ' },
      { name: 'Dumbbell Overhead Extension', desc: 'Duỗi tay sau qua đầu với tạ đơn' },
      { name: 'Skullcrusher (Lying Triceps Extension)', desc: 'Nằm duỗi tay sau tạ EZ' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/overhead-cable-tricep-extension.html',
    videoSearch: 'Overhead Cable Triceps Extension technique'
  },

  // --- PULL EXERCISES ---
  'straight arm pulldown': {
    name: 'Straight Arm Pulldown',
    primaryMuscle: 'Cơ xô (Latissimus Dorsi)',
    secondaryMuscles: ['Cơ tròn lớn (Teres Major)', 'Cơ bụng (Abs)'],
    equipment: 'Dây cáp cao + Thanh kéo thẳng / Dây thừng',
    instructions: [
      'Đứng hơi cúi người, giữ tay thẳng (khuỷu hơi cong cố định).',
      'Kéo thanh cáp từ trên cao xuống sát đùi, ép chặt cơ xô.',
      'Từ từ thả tay lên cao cảm nhận độ giãn của cơ xô.'
    ],
    alternatives: [
      { name: 'Dumbbell Pullover', desc: 'Kéo tạ đơn qua đầu nằm trên ghế' },
      { name: 'Cable Lat Pullover', desc: 'Kéo xô tay thẳng với dây cáp nghiêng' },
      { name: 'Machine Pullover', desc: 'Máy kéo xô Pullover' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/straight-arm-pulldown.html',
    videoSearch: 'Straight Arm Pulldown form tutorial'
  },
  'lat pulldown': {
    name: 'Lat Pulldown',
    primaryMuscle: 'Cơ xô rộng (Latissimus Dorsi)',
    secondaryMuscles: ['Cơ lưng giữa (Middle Back)', 'Cơ tay trước (Biceps)'],
    equipment: 'Máy kéo xô cao (Lat Pulldown Machine)',
    instructions: [
      'Nắm thanh kéo rộng hơn vai, ưỡn ngực nhẹ.',
      'Kéo thanh cáp xuống sát ngực trên, tưởng tượng kéo khuỷu tay về phía hông.',
      'Thả chậm thanh cáp lên trên đến khi cơ xô giãn hết cỡ.'
    ],
    alternatives: [
      { name: 'Pull Ups', desc: 'Hít xà đơn truyền thống' },
      { name: 'Assisted Pull Up', desc: 'Hít xà với máy trợ lực' },
      { name: 'Neutral Grip Lat Pulldown', desc: 'Kéo xô tay cầm song song' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/lat-pull-down.html',
    videoSearch: 'Lat Pulldown proper technique guide'
  },
  'chest supported t-bar row': {
    name: 'Chest Supported T-Bar Row',
    primaryMuscle: 'Cơ lưng giữa & Cơ xô (Rhomboids & Lats)',
    secondaryMuscles: ['Cơ vai sau (Rear Delts)', 'Cơ tay trước (Biceps)'],
    equipment: 'Máy T-Bar Row có đệm tựa ngực',
    instructions: [
      'Nằm úp ngực vào đệm tựa, triệt tiêu áp lực lên lưng dưới.',
      'Kéo tay cầm về sát sườn, ép chặt 2 xương bả vai vào nhau.',
      'Hạ tạ xuống chậm rãi và lặp lại.'
    ],
    alternatives: [
      { name: 'Bent Over Barbell Row', desc: 'Chèo thuyền gập người với thanh đòn' },
      { name: 'Chest Supported Dumbbell Row', desc: 'Chèo thuyền tạ đơn tựa ngực vào ghế dốc' },
      { name: 'Meadows Row', desc: 'Kéo xô ngang tạ đòn đơn' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/t-bar-row-with-handle.html',
    videoSearch: 'Chest Supported T-Bar Row guide'
  },
  'seated cable row': {
    name: 'Seated Cable Row',
    primaryMuscle: 'Cơ lưng giữa & Dày lưng (Rhomboids & Traps)',
    secondaryMuscles: ['Cơ xô (Lats)', 'Cơ tay trước (Biceps)'],
    equipment: 'Máy kéo cáp ngồi (Seated Row Cable Machine)',
    instructions: [
      'Ngồi thẳng lưng, chân tựa vững vào bàn đệm.',
      'Kéo tay cầm cáp về sát bụng dưới, ép chặt bả vai.',
      'Thả cáp chậm về phía trước, giữ thẳng lưng không bị gù.'
    ],
    alternatives: [
      { name: 'Single Arm Dumbbell Row', desc: 'Kéo tạ đơn 1 tay tựa ghế' },
      { name: 'Leverage Iso Row Machine', desc: 'Máy kéo lưng độc lập từng bên' },
      { name: 'Inverted Row', desc: 'Kéo người ngửa dưới thanh xà' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/seated-cable-row.html',
    videoSearch: 'Seated Cable Row form tutorial'
  },
  'pec deck rear delt fly': {
    name: 'Pec Deck Rear Delt Fly',
    primaryMuscle: 'Cơ vai sau (Posterior Deltoid)',
    secondaryMuscles: ['Cơ lưng trên (Upper Traps & Rhomboids)'],
    equipment: 'Máy Pec Deck ngửa người (Reverse Fly)',
    instructions: [
      'Ngồi quay mặt vào ghế máy Pec Deck.',
      'Mở rộng 2 tay ra sau, tập trung gồng và kéo bằng cơ vai sau.',
      'Từ từ khép tay về trước và lặp lại.'
    ],
    alternatives: [
      { name: 'Face Pulls', desc: 'Kéo cáp vào mặt tập vai sau & lưng trên' },
      { name: 'Bent Over Dumbbell Rear Delt Fly', desc: 'Gập người dang vai sau với tạ đơn' },
      { name: 'Cable Rear Delt Fly', desc: 'Dang vai sau với dây cáp bắt chéo' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/reverse-machine-fly.html',
    videoSearch: 'Pec Deck Rear Delt Fly execution'
  },
  'ez bar cable bicep curl': {
    name: 'EZ Bar Cable Bicep Curl',
    primaryMuscle: 'Cơ tay trước (Biceps Brachii)',
    secondaryMuscles: ['Cơ cẳng tay (Brachialis & Brachioradialis)'],
    equipment: 'Dây cáp thấp + Thanh sắt EZ gợn sóng',
    instructions: [
      'Cầm thanh EZ gợn sóng, đứng thẳng lưng, áp sát khuỷu tay vào sườn.',
      'Cuốn thanh cáp lên trên, siết chặt cơ tay trước ở đỉnh.',
      'Hạ chậm thanh cáp xuống vị trí ban đầu.'
    ],
    alternatives: [
      { name: 'Standing Dumbbell Bicep Curl', desc: 'Cuốn tay trước đứng với tạ đơn' },
      { name: 'Barbell Bicep Curl', desc: 'Cuốn tay trước với thanh đòn thẳng' },
      { name: 'Hammer Curl', desc: 'Cuốn tay trước tạ đơn kiểu dập búa' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/cable-curl.html',
    videoSearch: 'EZ Bar Cable Bicep Curl form'
  },

  // --- LEG / LOWER EXERCISES ---
  'lying leg curl': {
    name: 'Lying Leg Curl',
    primaryMuscle: 'Cơ đùi sau (Hamstrings)',
    secondaryMuscles: ['Cơ bắp chân (Gastrocnemius)'],
    equipment: 'Máy móc đùi sau nằm (Lying Leg Curl Machine)',
    instructions: [
      'Nằm úp trên máy, móc cổ chân dưới con lăn đệm.',
      'Gập chân móc con lăn về sát mông, siết chặt cơ đùi sau.',
      'Duỗi chân chậm rãi có kiểm soát.'
    ],
    alternatives: [
      { name: 'Seated Leg Curl', desc: 'Máy móc đùi sau ngồi' },
      { name: 'Dumbbell Romanian Deadlift (RDL)', desc: 'Gập hông đùi sau với tạ đơn' },
      { name: 'Swiss Ball Leg Curl', desc: 'Móc đùi sau với bóng tập' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/lying-leg-curl.html',
    videoSearch: 'Lying Leg Curl proper technique'
  },
  'leg extension': {
    name: 'Leg Extension',
    primaryMuscle: 'Cơ đùi trước (Quadriceps)',
    secondaryMuscles: ['Cơ đùi đầu thẳng (Rectus Femoris)'],
    equipment: 'Máy đá đùi ngồi (Leg Extension Machine)',
    instructions: [
      'Ngồi sát lưng vào tựa máy, đặt đệm tròn lên trên cổ chân.',
      'Đá chân duỗi thẳng ra trước, siết chặt cơ đùi trước.',
      'Hạ chậm chân xuống có kiểm soát.'
    ],
    alternatives: [
      { name: 'Sissy Squat', desc: 'Squat ngả người tập cô lập đùi trước' },
      { name: 'Goblet Squat', desc: 'Squat giữ tạ đơn trước ngực' },
      { name: 'Spanish Squat', desc: 'Squat tựa dây kháng lực tập đùi trước' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/leg-extension.html',
    videoSearch: 'Leg Extension form tutorial'
  },
  'hack squat': {
    name: 'Hack Squat',
    primaryMuscle: 'Cơ đùi trước & Cơ mông (Quads & Glutes)',
    secondaryMuscles: ['Cơ đùi sau (Hamstrings)'],
    equipment: 'Máy Hack Squat nghiêng',
    instructions: [
      'Đứng vai tựa đệm máy, đặt chân rộng bằng vai trên bàn đạp.',
      'Hạ người xuống sâu đến khi đùi song song bàn đạp.',
      'Đạp mạnh gót chân đẩy người lên vị trí ban đầu.'
    ],
    alternatives: [
      { name: 'Barbell Back Squat', desc: 'Squat gánh đòn sau lưng' },
      { name: 'Barbell Front Squat', desc: 'Squat gánh đòn trước ngực' },
      { name: 'Smith Machine Squat', desc: 'Squat trên máy Smith' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/hack-squat.html',
    videoSearch: 'Hack Squat machine execution'
  },
  'leg press': {
    name: 'Leg Press',
    primaryMuscle: 'Cơ đùi trước & Cơ mông (Quads & Glutes)',
    secondaryMuscles: ['Cơ đùi sau (Hamstrings)'],
    equipment: 'Máy đạp đùi (Leg Press Machine 45 độ)',
    instructions: [
      'Ngồi tựa lưng phẳng vào máy, đặt 2 chân lên bàn đạp rộng bằng vai.',
      'Tháo chốt an toàn, hạ bàn đạp xuống sát ngực.',
      'Đạp mạnh bàn đạp lên nhưng không khóa khớp gối.'
    ],
    alternatives: [
      { name: 'Hack Squat', desc: 'Squat trên máy nghiêng Hack Squat' },
      { name: 'Belt Squat', desc: 'Squat đeo đai tạ' },
      { name: 'Barbell Squat', desc: 'Squat gánh thanh đòn' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/sled-45-degree-leg-press.html',
    videoSearch: 'Leg Press 45 degree proper form'
  },
  'bulgarian split squat': {
    name: 'Bulgarian Split Squat',
    primaryMuscle: 'Cơ mông & Đùi trước (Glutes & Quads)',
    secondaryMuscles: ['Cơ đùi sau (Hamstrings)', 'Cơ thắt lưng'],
    equipment: 'Ghế tập phẳng + Tạ đơn (Dumbbells)',
    instructions: [
      'Đặt 1 mu bàn chân lên ghế phía sau, chân còn lại bước ra trước.',
      'Hạ đầu gối chân sau xuống sát sàn, thân người đổ nhẹ ra trước.',
      'Đạp gót chân trước đứng dậy.'
    ],
    alternatives: [
      { name: 'Walking Lunges', desc: 'Bước gập gối tiến về trước với tạ đơn' },
      { name: 'Reverse Lunges', desc: 'Bước gập gối lùi về sau' },
      { name: 'Step-ups', desc: 'Bước lên bục cao với tạ đơn' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/bulgarian-split-squat.html',
    videoSearch: 'Bulgarian Split Squat tutorial'
  },
  'standing calf raise': {
    name: 'Standing Calf Raise',
    primaryMuscle: 'Cơ bắp chân (Gastrocnemius & Soleus)',
    secondaryMuscles: ['Cơ cổ chân'],
    equipment: 'Máy nhón bắp chân đứng / Bục cao + Tạ',
    instructions: [
      'Đặt nửa trước bàn chân lên bục cao, gót chân thả tự do.',
      'Nhón cao hết cỡ cổ chân lên, giữ siết bắp chân 1 giây.',
      'Hạ sâu gót chân xuống dưới bục để nhún duỗi tối đa.'
    ],
    alternatives: [
      { name: 'Seated Calf Raise', desc: 'Nhón bắp chân ngồi trên máy' },
      { name: 'Leg Press Calf Raise', desc: 'Nhón bắp chân trên máy đạp đùi' },
      { name: 'Single Leg Calf Raise', desc: 'Nhón bắp chân từng chân với tạ đơn' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/standing-calf-raise.html',
    videoSearch: 'Standing Calf Raise technique'
  },

  // --- PUSH PULL MIX EXERCISES ---
  'cable lateral raise': {
    name: 'Cable Lateral Raise',
    primaryMuscle: 'Cơ vai giữa (Lateral Deltoid)',
    secondaryMuscles: ['Cơ vai trước'],
    equipment: 'Máy cáp thấp + Tay cầm đơn',
    instructions: [
      'Đứng bên cạnh máy cáp thấp, tay kéo cáp bắt chéo trước đùi.',
      'Dang tay ra ngang vai, duy trì lực căng cáp liên tục.',
      'Hạ chậm tay về vị trí ban đầu.'
    ],
    alternatives: [
      { name: 'Dumbbell Lateral Raise', desc: 'Dang vai đứng với tạ đơn' },
      { name: 'Machine Lateral Raise', desc: 'Máy dang vai ngồi' },
      { name: 'Chest Supported Lateral Raise', desc: 'Dang vai tựa ngực ghế dốc' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/cable-lateral-raise.html',
    videoSearch: 'Cable Lateral Raise form'
  },
  'smith shoulder press': {
    name: 'Smith Shoulder Press',
    primaryMuscle: 'Cơ vai trước (Anterior Deltoid)',
    secondaryMuscles: ['Cơ tay sau (Triceps)', 'Cơ vai giữa'],
    equipment: 'Máy Smith + Ghế ngồi thẳng',
    instructions: [
      'Đặt ghế dưới thanh đòn máy Smith.',
      'Hạ thanh đòn xuống ngang cằm/cổ trên.',
      'Đẩy dứt khoát thanh đòn lên cao có kiểm soát.'
    ],
    alternatives: [
      { name: 'Barbell Military Press', desc: 'Đẩy vai đứng tạ đòn' },
      { name: 'Dumbbell Shoulder Press', desc: 'Đẩy vai ngồi tạ đơn' },
      { name: 'Shoulder Press Machine', desc: 'Máy đẩy vai cô lập' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/smith-machine-shoulder-press.html',
    videoSearch: 'Smith Machine Shoulder Press guide'
  },
  'smith incline press': {
    name: 'Smith Incline Press',
    primaryMuscle: 'Cơ ngực trên (Upper Pectoralis)',
    secondaryMuscles: ['Cơ vai trước', 'Cơ tay sau'],
    equipment: 'Máy Smith + Ghế dốc 30-45 độ',
    instructions: [
      'Điều chỉnh ghế dốc đặt chính giữa khung Smith.',
      'Hạ thanh đòn chậm sát phần xương đòn ngực trên.',
      'Đẩy thanh đòn lên cao có kiểm soát.'
    ],
    alternatives: [
      { name: 'Incline Dumbbell Press', desc: 'Đẩy ngực trên với tạ đơn' },
      { name: 'Incline Barbell Press', desc: 'Đẩy ngực trên thanh đòn tự do' },
      { name: 'Incline Cable Press', desc: 'Đẩy ngực trên với dây cáp' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/smith-machine-incline-bench-press.html',
    videoSearch: 'Smith Incline Press execution'
  },
  'reverse face rope triceps pushdown': {
    name: 'Reverse Face Rope Triceps Pushdown',
    primaryMuscle: 'Cơ tay sau (Triceps)',
    secondaryMuscles: ['Cơ cẳng tay'],
    equipment: 'Dây cáp cao + Dây thừng',
    instructions: [
      'Cầm dây thừng kéo cáp cao xuống.',
      'Tách 2 đầu dây sang 2 bên khi đẩy xuống hết cỡ.',
      'Siết chặt cơ tay sau ở điểm cuối.'
    ],
    alternatives: [
      { name: 'Triceps Bar Pushdown', desc: 'Đẩy tay sau thanh sắt thẳng/chữ V' },
      { name: 'Overhead Cable Extension', desc: 'Duỗi tay sau qua đầu dây cáp' },
      { name: 'Dips', desc: 'Xà kép tập tay sau' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/tricep-rope-pushdown.html',
    videoSearch: 'Rope Triceps Pushdown technique'
  },
  'assisted pull up': {
    name: 'Assisted Pull Up',
    primaryMuscle: 'Cơ xô & Lưng (Lats & Back)',
    secondaryMuscles: ['Cơ tay trước (Biceps)'],
    equipment: 'Máy hít xà trợ lực (Assisted Pull Up Machine)',
    instructions: [
      'Đặt 2 đầu gối hoặc chân lên bàn đệm trợ lực.',
      'Kéo người lên sao cho cằm vượt qua tay cầm.',
      'Hạ người xuống chậm rãi có kiểm soát.'
    ],
    alternatives: [
      { name: 'Lat Pulldown', desc: 'Kéo xô cao trên máy cáp' },
      { name: 'Pull Ups (Bodyweight)', desc: 'Hít xà đơn tự do' },
      { name: 'Band Assisted Pull Up', desc: 'Hít xà trợ lực bằng dây kháng lực' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/assisted-pull-up.html',
    videoSearch: 'Assisted Pull Up machine form'
  },
  'bench support incline cable curl': {
    name: 'Bench Support Incline Cable Curl',
    primaryMuscle: 'Cơ tay trước (Biceps Long Head)',
    secondaryMuscles: ['Cơ cẳng tay'],
    equipment: 'Ghế dốc + Dây cáp thấp',
    instructions: [
      'Nằm ngửa trên ghế dốc nghiêng quay lưng về máy cáp.',
      'Cuốn tay trước về phía vai, giữ khuỷu tay cố định hướng ra sau.',
      'Cảm nhận độ căng kéo tối đa ở tay trước.'
    ],
    alternatives: [
      { name: 'Incline Dumbbell Curl', desc: 'Cuốn tay trước tạ đơn nằm ghế dốc' },
      { name: 'Preacher Curl', desc: 'Cuốn tay trước tựa đệm Preacher' },
      { name: 'Spider Curl', desc: 'Cuốn tay trước nằm úp trên ghế dốc' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/incline-dumbbell-curl.html',
    videoSearch: 'Incline Cable Curl biceps tutorial'
  },

  // --- LOWER EXERCISES ---
  'adductor': {
    name: 'Adductor Machine',
    primaryMuscle: 'Cơ đùi trong (Hip Adductors)',
    secondaryMuscles: ['Cơ vùng hông'],
    equipment: 'Máy ép đùi trong (Adductor Machine)',
    instructions: [
      'Ngồi tựa sát lưng vào máy, mở rộng 2 chân ra 2 bên đệm.',
      'Dùng lực cơ đùi trong khép 2 chân vào sát nhau.',
      'Mở rộng 2 chân ra chậm rãi.'
    ],
    alternatives: [
      { name: 'Sumo Squat', desc: 'Squat chân rộng hướng mũi chân ra ngoài' },
      { name: 'Cossack Squat', desc: 'Squat khuỳnh chân sang từng bên' },
      { name: 'Cable Hip Adduction', desc: 'Ép đùi trong với dây cáp cổ chân' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/thigh-adductor.html',
    videoSearch: 'Seated Hip Adductor Machine guide'
  },
  'dumbbell rdl': {
    name: 'Dumbbell RDL (Romanian Deadlift)',
    primaryMuscle: 'Cơ đùi sau & Mông (Hamstrings & Glutes)',
    secondaryMuscles: ['Cơ lưng dưới (Lower Back)'],
    equipment: 'Cặp tạ đơn (Dumbbells)',
    instructions: [
      'Đứng thẳng cầm 2 tạ đơn trước đùi.',
      'Đẩy hông ra sau, gập người xuống giữ lưng luôn thẳng.',
      'Hạ tạ qua gối cảm nhận đùi sau căng hết cỡ rồi đẩy hông về trước đứng dậy.'
    ],
    alternatives: [
      { name: 'Barbell RDL', desc: 'Deadlift kiểu Romania với thanh đòn' },
      { name: 'Single Leg Dumbbell RDL', desc: 'RDL 1 chân với tạ đơn' },
      { name: 'Good Mornings', desc: 'Cúi người chào buổi sáng với thanh đòn' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/dumbbell-romanian-deadlift.html',
    videoSearch: 'Dumbbell Romanian Deadlift form tutorial'
  },
  'seated leg curl': {
    name: 'Seated Leg Curl',
    primaryMuscle: 'Cơ đùi sau (Hamstrings)',
    secondaryMuscles: ['Cơ bắp chân'],
    equipment: 'Máy móc đùi sau ngồi (Seated Leg Curl)',
    instructions: [
      'Ngồi sát lưng vào đệm, ép đệm giữ đùi chặt.',
      'Gập cổ chân móc đệm xuống dưới sát ghế.',
      'Nâng chân lên chậm rãi có kiểm soát.'
    ],
    alternatives: [
      { name: 'Lying Leg Curl', desc: 'Máy móc đùi sau nằm' },
      { name: 'Dumbbell RDL', desc: 'Deadlift gập hông với tạ đơn' },
      { name: 'Nordic Hamstring Curl', desc: 'Quỳ gối gập đùi sau kiểu Nordic' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/seated-leg-curl.html',
    videoSearch: 'Seated Leg Curl machine guide'
  },
  'hip thrust': {
    name: 'Hip Thrust',
    primaryMuscle: 'Cơ mông lớn (Gluteus Maximus)',
    secondaryMuscles: ['Cơ đùi sau', 'Cơ thắt lưng'],
    equipment: 'Ghế tập phẳng + Thanh đòn tạ (Barbell)',
    instructions: [
      'Tựa phần lưng trên vào thành ghế, đặt thanh đòn trên nếp gấp hông.',
      'Đạp mạnh gót chân đẩy hông lên cao đến khi thân người song song mặt sàn.',
      'Siết chặt mông 1-2 giây ở đỉnh trước khi hạ hông xuống.'
    ],
    alternatives: [
      { name: 'Glute Bridge', desc: 'Nằm sàn nâng hông tập mông' },
      { name: 'Cable Pull Through', desc: 'Kéo dây cáp qua háng đứng lên' },
      { name: 'Single Leg Hip Thrust', desc: 'Đẩy hông mông từng chân' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/barbell-hip-thrust.html',
    videoSearch: 'Barbell Hip Thrust proper form'
  },
  'seated calf raise': {
    name: 'Seated Calf Raise',
    primaryMuscle: 'Cơ bắp chân sâu (Soleus)',
    secondaryMuscles: ['Cơ bắp chân nông (Gastrocnemius)'],
    equipment: 'Máy nhón bắp chân ngồi',
    instructions: [
      'Ngồi trên máy, đặt 2 đệm đùi lên đùi dưới sát gối.',
      'Nhón gót chân lên cao tối đa.',
      'Hạ sâu gót chân xuống dưới bục để cơ bắp chân duỗi hết cỡ.'
    ],
    alternatives: [
      { name: 'Standing Calf Raise', desc: 'Nhón bắp chân đứng' },
      { name: 'Leg Press Calf Raise', desc: 'Nhón bắp chân trên máy đạp đùi' },
      { name: 'Dumbbell Seated Calf Raise', desc: 'Nhón bắp chân ngồi đè tạ đơn lên đùi' }
    ],
    guideUrl: 'https://www.muscleandstrength.com/exercises/seated-calf-raise.html',
    videoSearch: 'Seated Calf Raise form tutorial'
  }
};

/**
 * Helper function to look up exercise details from database
 */
export function getExerciseDetails(exerciseName) {
  if (!exerciseName) return null;
  const cleanName = exerciseName
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove numbers like "1. "
    .replace(/\s*\([^)]*\)/g, '') // Remove parentheses like "(Strength)"
    .trim();

  // Exact match
  if (EXERCISE_DATABASE[cleanName]) {
    return EXERCISE_DATABASE[cleanName];
  }

  // Partial search match
  const keys = Object.keys(EXERCISE_DATABASE);
  const matchedKey = keys.find((key) => cleanName.includes(key) || key.includes(cleanName));
  if (matchedKey) {
    return EXERCISE_DATABASE[matchedKey];
  }

  // Generic Fallback
  return {
    name: exerciseName,
    primaryMuscle: 'Nhóm cơ tập chuyên sâu',
    secondaryMuscles: ['Cơ hỗ trợ liên quan'],
    equipment: 'Thiết bị tập luyện chuẩn',
    instructions: [
      'Giữ lưng thẳng, siết chặt cơ bụng.',
      'Thực hiện chuyển động có kiểm soát, tập trung phát lực từ nhóm cơ chính.',
      'Thở ra khi phát lực đẩy/kéo, hít vào khi nhả lực.'
    ],
    alternatives: [
      { name: 'Bài tập tạ đơn cùng nhóm cơ', desc: 'Tập tự do với tạ đơn' },
      { name: 'Bài tập máy cô lập', desc: 'Tập trên máy chuyên dụng' }
    ],
    guideUrl: `https://www.muscleandstrength.com/exercises?search=${encodeURIComponent(exerciseName)}`,
    videoSearch: `${exerciseName} proper form guide`
  };
}

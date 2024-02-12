export const questions = {
    1: {
          "question": "Are you willing to invest in a high-risk, high-return investment with the potential for significant fluctuations in value?",
          "options": ["Yes", "No", "Unsure"],
          "values": [3, 1, 2]
       },
    2: {
          "question": "How comfortable are you with the idea of potentially losing a significant portion of your investment in exchange for the possibility of higher returns?",
          "options": ["Very comfortable", "Somewhat comfortable", "Not comfortable"],
          "values": [3, 2, 1]
       },
    3: {
          "question": "In the past, how have you reacted to significant fluctuations in the value of your investments?",
          "options": ["I have remained calm and maintained my investment strategy", "I have felt anxious but stayed invested", "I have sold some or all of my investments to avoid further losses"],
          "values": [3, 2, 1]
       },
    4: {
          "question": "How would you describe your level of financial knowledge and understanding of investment products and markets?",
          "options": ["Very high", "Moderate", "Limited"],
          "values": [3, 2, 1]
       },
    5: {
          "question": "Have you previously invested in assets with high volatility, such as stocks or commodities?",
          "options": ["Yes, extensively", "Yes, to some extent", "No, never"],
          "values": [3, 2, 1]
       },
    6: {
          "question": "How do you perceive the relationship between risk and return in investment markets?",
          "options": ["I believe higher returns are always accompanied by higher risk", "I believe it is possible to achieve high returns with minimal risk", "I am unsure about the relationship between risk and return"],
          "values": [1, 3, 2]
       },
    7: {
          "question": "How would you react to a sudden and significant decline in the value of your investment portfolio?",
          "options": ["I would stay invested and wait for the market to recover", "I would consider adjusting my investment strategy", "I would immediately sell some or all of my investments to limit further losses"],
          "values": [3, 2, 1]
       },
    8: {
          "question": "How would you describe your experience with various investment products and financial markets?",
          "options": ["Extensive experience", "Moderate experience", "Limited experience"],
          "values": [3, 2, 1]
       },
    9: {
          "question": "How important is the preservation of your initial investment amount compared to the potential for higher returns?",
          "options": ["Preservation of initial investment is paramount", "Balancing preservation and potential returns is important", "Potential for higher returns is paramount"],
          "values": [1, 2, 3]
       },
    10: {
          "question": "How do you perceive your ability to handle financial risk and market volatility?",
          "options": ["I am very comfortable with financial risk and market volatility", "I am somewhat comfortable with financial risk and market volatility", "I am not comfortable with financial risk and market volatility"],
          "values": [3, 2, 1]
       }
    }
 
 
 
 export function calculate_risk_score(answers){
     let risk_score = 0
     for (const question in questions){
            const value = questions[question]["values"][answers[question] - 1]
            risk_score += value
        }
     return risk_score
 }
 
 export function calculate_risk_category(risk_score){
     if (risk_score >= 10 && risk_score <= 14)
        return "Low risk"
     else if (risk_score >= 15 && risk_score <= 19)
        return "Moderate risk"
     else if (risk_score >= 20 && risk_score <= 24)
        return "High risk"
     else if (risk_score >= 25 && risk_score <= 30)
        return "Very high risk"
     else
        return "Invalid risk score"


 }
export interface Task {
    id: string;        
    title: string;     
    description: string;  
    category: 'work' | 'study' | 'personal' | 'health' | string; 
    priority: 'low' | 'medium' | 'high'; 
    deadline: Date | null; 
    isCompleted: boolean;  
    createdAt: Date;   
    updatedAt: Date;
}
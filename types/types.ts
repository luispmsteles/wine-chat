// export interface ChatLog {
//     id: string;
//     question: string;
//     response: string;
//     extracted?: string;
//     ip?: string;
//     location?: string;
//     createdAt: string;
//   }

  export interface ChatLog {
    id: string;
    question: string;
    response: string;
    extracted: string | null;
    ip: string | null;
    location: string | null;
    createdAt: Date;
}
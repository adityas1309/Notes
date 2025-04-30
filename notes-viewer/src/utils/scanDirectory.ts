export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileItem[];
}

const readDirectory = async (): Promise<FileItem[]> => {
  try {
    // For development, we'll use a mock structure based on the files we know exist
    return [
      {
        name: 'JavaScript',
        path: '/JavaScript',
        type: 'directory',
        children: [
          {
            name: 'Basics',
            path: '/JavaScript/Basics',
            type: 'directory',
            children: [
              {
                name: '1.Intro_Keyword_Variable.md',
                path: '/JavaScript/Basics/1.Intro_Keyword_Variable.md',
                type: 'file'
              },
              {
                name: '2.Coding_variables.md',
                path: '/JavaScript/Basics/2.Coding_variables.md',
                type: 'file'
              },
              {
                name: '3.Console.log.md',
                path: '/JavaScript/Basics/3.Console.log.md',
                type: 'file'
              },
              {
                name: '4.Data_Types.md',
                path: '/JavaScript/Basics/4.Data_Types.md',
                type: 'file'
              },
              {
                name: '5.Complex_Data_Types.md',
                path: '/JavaScript/Basics/5.Complex_Data_Types.md',
                type: 'file'
              },
              {
                name: '6.Special_Char.md',
                path: '/JavaScript/Basics/6.Special_Char.md',
                type: 'file'
              },
              {
                name: '7.Comments.md',
                path: '/JavaScript/Basics/7.Comments.md',
                type: 'file'
              },
              {
                name: '8.Operators.md',
                path: '/JavaScript/Basics/8.Operators.md',
                type: 'file'
              },
              {
                name: '9.Relational_Operator.md',
                path: '/JavaScript/Basics/9.Relational_Operator.md',
                type: 'file'
              },
              {
                name: '10.Logical_Operator.md',
                path: '/JavaScript/Basics/10.Logical_Operator.md',
                type: 'file'
              },
              {
                name: '11.Short-Circuiting_TypeCoercion.md',
                path: '/JavaScript/Basics/11.Short-Circuiting_TypeCoercion.md',
                type: 'file'
              },
              {
                name: '12.Special_Numbers.md',
                path: '/JavaScript/Basics/12.Special_Numbers.md',
                type: 'file'
              },
              {
                name: '13.Bitwise_Operator.md',
                path: '/JavaScript/Basics/13.Bitwise_Operator.md',
                type: 'file'
              }
            ]
          }
        ]
      }
    ];
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
};

export const scanDirectory = async (): Promise<FileItem[]> => {
  return readDirectory();
}; 
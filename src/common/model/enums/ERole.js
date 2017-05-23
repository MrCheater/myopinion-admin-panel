export const ERole = {
    ADMIN     : 'ADMIN',
    USER      : 'USER',
    MODERATOR : 'MODERATOR',
    ANON      : 'ANON'
};

export function ERoleToString(role) {
    switch (role) {
        case ERole.ADMIN     : return 'admin';
        case ERole.USER      : return 'user';
        case ERole.MODERATOR : return 'moderator';
        case ERole.ANON      : return 'anon';
    }
}
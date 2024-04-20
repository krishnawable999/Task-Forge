
export function getInitials(fullName) {

    if(fullName !== 'string' || !fullName.trim()) return ' ';

    const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");


    return initialsStr;
}
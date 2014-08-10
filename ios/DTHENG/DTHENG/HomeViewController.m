#import "HomeViewController.h"

// author : Daniel Thengvall

@interface HomeViewController ()

@end

@implementation HomeViewController

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 7;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
            
        case 0: {
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
            UIImageView *profile = (UIImageView *)[cell viewWithTag:1];
            profile.image = [UIImage imageNamed:@"profile"];

            return cell;
        }
            
        case 1:
            return [tableView dequeueReusableCellWithIdentifier:@"nameCell" forIndexPath:indexPath];
        case 2: {
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"bioCell" forIndexPath:indexPath];

            UIView *imgView = [[UIView alloc] init];
            imgView.backgroundColor = [UIColor lightGrayColor];
            imgView.alpha = 0.2f;
            imgView.frame = CGRectMake(0, cell.frame.size.height, cell.frame.size.width, 1);
            [cell.contentView addSubview:imgView];

            return cell;
        }
        case 3: {
            
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"resumeLink" forIndexPath:indexPath];
            
            UIView *imgView = [[UIView alloc] init];
            imgView.backgroundColor = [UIColor lightGrayColor];
            imgView.alpha = 0.2f;
            imgView.frame = CGRectMake(0, cell.frame.size.height, cell.frame.size.width, 1);
            [cell.contentView addSubview:imgView];
            
            
            return cell;
        }
        default: {
            
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"socialLink" forIndexPath:indexPath];
            
            UIView *imgView = [[UIView alloc] init];
            imgView.backgroundColor = [UIColor lightGrayColor];
            imgView.alpha = 0.2f;
            imgView.frame = CGRectMake(0, cell.frame.size.height, cell.frame.size.width, 1);
            [cell.contentView addSubview:imgView];
            
            switch (indexPath.row) {
                case 4:
                    cell.textLabel.text = @"GitHub";
                    break;
                case 5:
                    cell.textLabel.text = @"AngelList";
                    break;
                case 6:
                    cell.textLabel.text = @"LinkedIn";
            }
            
            return cell;
            
        }


            
    }
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
        case 4:
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://github.com/DTHENG"]];
            break;
        case 5:
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://angel.co/daniel-thengvall"]];
            break;
        case 6:
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://lnkd.in/bD6S_7J"]];
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
        case 0:
            return 158;
        case 1:
            return 73;
        case 2:
            return 173;
        default:
            return 44;
    }
}
@end
